import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'mystery.shopping.app',
    appName: 'MysteryShoppingApp',
    webDir: 'dist/mystery-shopping-app',
    bundledWebRuntime: false,
    server: {
        url: "http://192.168.0.4:8100",
        cleartext: true
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            backgroundColor: "#ffffffff",
            androidSplashResourceName: "splashscreen",
            androidScaleType: "CENTER_CROP",
            showSpinner: true,
            androidSpinnerStyle: "large",
            iosSpinnerStyle: "small",
            spinnerColor: "#999999",
            splashFullScreen: true,
            splashImmersive: true,
            layoutName: "launch_screen",
            useDialog: true,
        }
    },
    android: {
        
    }
};

export default config;
