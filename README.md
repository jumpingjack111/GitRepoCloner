# ISI MSQE Study Tracker

An advanced study tracking application specifically designed for ISI MSQE (Indian Statistical Institute Master of Science in Quantitative Economics) preparation. This app helps students optimize their learning journey through intelligent progress tracking, personalized insights, and an engaging user experience.

## Features

- **Phase-based Progress Tracking**: Monitor your progress through the four phases of ISI MSQE preparation
- **Task Management**: Create and manage custom tasks with priorities and deadlines
- **Study Timers**: Standard study timer and Pomodoro technique timer for focused study sessions
- **Study Schedule**: Plan your study sessions with specific objectives and reminders
- **Progress Visualization**: View your progress with interactive charts and statistics
- **Academic Resources**: Access recommended resources for each phase of your preparation
- **Offline Support**: Use the app even when you're offline (PWA capabilities)
- **Mobile App**: Download as an Android APK for a native mobile experience

## Building the Android APK

This application can be built as an Android APK using Capacitor. Follow these steps to create the APK:

1. Run the build script:
   ```
   ./build-apk.sh
   ```

2. This will build the web application and set up the Android project. At the end, you'll see instructions for building the APK.

3. To build the APK, you'll need to have Android Studio installed on your machine.

4. Open the Android project in Android Studio:
   ```
   npx cap open android
   ```

5. In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)

6. The APK will be built and can be found in the `android/app/build/outputs/apk/debug/` directory.

7. After building the APK, run the download link generator script:
   ```
   ./generate-apk-download-link.sh
   ```

8. This will create a download page at `dist/download-apk.html` and copy the APK to the `dist` directory.

9. Deploy your project to make the download page accessible.

## Installation Instructions

1. Download the APK file from the provided link.
2. On your Android device, go to Settings > Security.
3. Enable "Unknown Sources" to allow installation of apps from sources other than the Play Store.
4. Use a file manager to locate the downloaded APK and tap on it to install.
5. Follow the on-screen instructions to complete the installation.
6. Once installed, you can open the app from your app drawer.

## Web Version

The web version of this application is also available and includes PWA (Progressive Web App) capabilities, which means you can install it on your device through the browser.

## Technologies Used

- React
- TypeScript
- Vite
- TailwindCSS
- Capacitor (for Android APK)
- Service Workers (for PWA capabilities)
