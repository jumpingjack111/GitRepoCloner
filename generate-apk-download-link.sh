#!/bin/bash

# Check if APK exists
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

if [ ! -f "$APK_PATH" ]; then
  echo "APK not found at $APK_PATH. Please build the APK first."
  echo "Run the build-apk.sh script and follow the instructions."
  exit 1
fi

# Generate a simple HTML page with download link
cat > dist/download-apk.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download ISI MSQE Study Tracker APK</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      background-color: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-top: 40px;
    }
    h1 {
      color: #7c3aed;
      margin-bottom: 20px;
    }
    .download-button {
      display: inline-block;
      background-color: #7c3aed;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
    .download-button:hover {
      background-color: #6d28d9;
    }
    .instructions {
      margin-top: 30px;
      padding: 20px;
      border-left: 4px solid #7c3aed;
      background-color: #f3f4f6;
    }
    .instructions h2 {
      margin-top: 0;
      color: #4c1d95;
    }
    .instructions ol {
      padding-left: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>ISI MSQE Study Tracker</h1>
    <p>Download the Android APK file for the ISI MSQE Study Tracker application.</p>
    
    <a href="app-debug.apk" class="download-button" download>Download APK</a>
    
    <div class="instructions">
      <h2>Installation Instructions</h2>
      <ol>
        <li>Download the APK file by clicking the button above.</li>
        <li>On your Android device, go to Settings > Security.</li>
        <li>Enable "Unknown Sources" to allow installation of apps from sources other than the Play Store.</li>
        <li>Use a file manager to locate the downloaded APK and tap on it to install.</li>
        <li>Follow the on-screen instructions to complete the installation.</li>
        <li>Once installed, you can open the app from your app drawer.</li>
      </ol>
    </div>
  </div>
</body>
</html>
HTML

# Copy the APK to the dist directory
cp "$APK_PATH" dist/app-debug.apk

echo "Download page created at dist/download-apk.html"
echo "You can now deploy your project and share the link to this page for APK downloads."
