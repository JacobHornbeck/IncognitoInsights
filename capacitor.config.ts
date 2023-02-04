import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'mystery.shopping.app',
    appName: 'MysteryShoppingApp',
    webDir: 'dist/mystery-shopping-app',
    bundledWebRuntime: false,
    server: {
        url: "http://192.168.0.4:8100",
        cleartext: true
    }
};

export default config;
