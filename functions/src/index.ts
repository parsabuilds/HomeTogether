```diff
--- a/functions/src/index.ts
+++ b/functions/src/index.ts
@@ -126,10 +126,12 @@
       message: 'Your message has been sent successfully!' 
     });
 
-  } catch (error: any) {
-    console.error('Error sending email:', error);
+  } catch (error: unknown) { // Changed from 'any' to 'unknown'
+    // Safely extract error message, handling cases where 'error' might not be an Error object
+    const errorMessage = (error instanceof Error) ? error.message : 'An unexpected error occurred.';
+    console.error('Error sending email:', error);
     
     // Send error response
     res.status(500).json({ 
-      error: error.message || 'Failed to send message. Please try again later.' 
+      error: errorMessage || 'Failed to send message. Please try again later.' // Use the safely extracted message
     });
   }
 });
```