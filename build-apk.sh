#!/bin/bash

# Build the web application
echo "Building the web application..."
npm run build

# Initialize Capacitor if not already initialized
if [ ! -f "capacitor.config.json" ]; then
  echo "Initializing Capacitor..."
  npx cap init "ISI MSQE Study Tracker" "com.isimsqe.studytracker" --web-dir="dist"
fi

# Add Android platform if not already added
if [ ! -d "android" ]; then
  echo "Adding Android platform..."
  npx cap add android
fi

# Sync the web app with the Android platform
echo "Syncing web app with Android platform..."
npx cap sync android

# Instructions for building APK
echo ""
echo "======================= APK BUILD INSTRUCTIONS ======================="
echo "To build the APK, you need to:"
echo "1. Run: npx cap open android"
echo "2. This will open Android Studio with your project"
echo "3. In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo "4. The APK will be built and can be found in the android/app/build/outputs/apk/debug/ directory"
echo "==================================================================="
