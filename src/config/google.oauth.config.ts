import { registerAs } from "@nestjs/config";

export default registerAs('googleOAuth', () => ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL
}));
export const KEY = 'GoogleOauthConfig';
interface GoogleOAuthConfig {
    clientID: string;
    clientSecret: string;
    callbackUrl: string;
};