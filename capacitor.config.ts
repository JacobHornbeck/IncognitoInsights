import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'mystery.shopping.app',
    appName: 'MysteryShoppingApp',
    webDir: 'dist/mystery-shopping-app',
    bundledWebRuntime: false,
    // server: {
    //     url: "http://192.168.0.4:8100",
    //     cleartext: true
    // },
    plugins: {
        SplashScreen: {
            launchAutoHide: true,
            launchShowDuration: 0
        }
    },
    cordova: {
        preferences: {
            LottieFullScreen: "true",
            LottieScaleType: "CENTER_CROP",
            LottieHideAfterAnimationEnd: "true",
            LottieAnimationLocation: "public/assets/splash.json",
            LottieFadeOutDuration: "500"
        }
    }
};

export default config;
