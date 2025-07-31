const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { ApiClient, TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');

admin.initializeApp();

// Initialize Secret Manager client
const secretManagerClient = new SecretManagerServiceClient();

// Function to get Brevo API key from Secret Manager
async function getBrevoApiKey() {
  try {
    const projectId = process.env.GCLOUD_PROJECT;
    const secretName = `projects/${projectId}/secrets/BREVO_API_KEY/versions/latest`;
    
    const [version] = await secretManagerClient.accessSecretVersion({
      name: secretName,
    });
    
    const apiKey = version.payload.data.toString();
    return apiKey;
  } catch (error) {
    console.error('Error retrieving Brevo API key:', error);
    throw new Error('Failed to retrieve API key');
  }
}

// Contact form submission handler
exports.sendContactEmail = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).send();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Extract form data from request body
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      res.status(400).json({ 
        error: 'Missing required fields. Please fill in all fields.' 
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ 
        error: 'Please enter a valid email address.' 
      });
      return;
    }

    // Get Brevo API key from Secret Manager
    const apiKey = await getBrevoApiKey();

    // Initialize Brevo API client
    const apiClient = new ApiClient();
    apiClient.authentications['api-key'].apiKey = apiKey;
    
    const transactionalEmailsApi = new TransactionalEmailsApi(apiClient);

    // Prepare email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p style="color: #666; font-size: 12px;">
        This message was sent via the HomeTogether contact form.
      </p>
    `;

    // Create email object
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.sender = { 
      name: 'HomeTogether Contact Form', 
      email: 'your-verified-sender@yourdomain.com' // TODO: Replace with your verified Brevo sender email
    };
    sendSmtpEmail.to = [{ 
      name: 'HomeTogether Support', 
      email: 'support@yourdomain.com' // TODO: Replace with your support email
    }];
    sendSmtpEmail.replyTo = { 
      name: name, 
      email: email 
    };
    sendSmtpEmail.subject = `Contact Form: ${subject}`;
    sendSmtpEmail.htmlContent = htmlContent;

    // Send email
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Send error response
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});