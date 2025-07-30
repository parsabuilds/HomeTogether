// functions/src/index.ts

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
// Corrected import for Brevo v3, including the ApiKeys enum
import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Secret Manager client
const secretManagerClient = new SecretManagerServiceClient();

// Function to get Brevo API key from Secret Manager
// This function remains unchanged from your original file.
async function getBrevoApiKey(): Promise<string> {
  try {
    const projectId = process.env.GCLOUD_PROJECT;
    if (!projectId) {
      throw new Error('GCLOUD_PROJECT environment variable not set.');
    }
    const secretName = `projects/${projectId}/secrets/BREVO_API_KEY/versions/latest`;
    
    const [version] = await secretManagerClient.accessSecretVersion({
      name: secretName,
    });
    
    const apiKey = version.payload?.data?.toString();
    if (!apiKey) {
      throw new Error('Brevo API key not found in Secret Manager payload.');
    }
    return apiKey;
  } catch (error) {
    console.error('Error retrieving Brevo API key from Secret Manager:', error);
    throw new Error('Failed to retrieve API key from Secret Manager');
  }
}

// Contact form submission handler
export const sendContactEmail = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*'); // For production, restrict this to your web app's domain
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

    // Correctly initialize Brevo TransactionalEmailsApi
    const transactionalEmailsApi = new TransactionalEmailsApi();

    // Set the API key for authentication on the API instance
    transactionalEmailsApi.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      apiKey
    );

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
        This message was sent via the AgentIQ contact form.
      </p>
    `;

    // Create the email object
    const sendSmtpEmail = new SendSmtpEmail();
    
    sendSmtpEmail.sender = { 
      name: 'AgentIQ Contact Form', 
      email: 'parsarajabi14@gmail.com' // TODO: Replace with your verified Brevo sender email
    };
    sendSmtpEmail.to = [{ 
      name: 'AgentIQ Support', 
      email: 'parsarajabi7@gmail.com' // TODO: Replace with your personal email
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

  } catch (error: unknown) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send message. Please try again later.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ 
      error: errorMessage 
    });
  }
});