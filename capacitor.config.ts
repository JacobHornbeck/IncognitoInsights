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
        "SplashScreen": {
            "launchAutoHide": false,
            "androidScaleType": "CENTER_CROP",
            "splashFullScreen": true,
            "splashImmersive": false,
            "backgroundColor": "#f0f0f0",
            "showSpinner": true,
            "spinnerColor": "#000000",
            "androidSpinnerStyle": 'horizontal'
        }
    }
};

export default config;
