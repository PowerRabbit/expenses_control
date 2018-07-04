import * as functions from 'firebase-functions';
import * as firebase from "firebase";
import { authService } from './modules/auth/auth-service';
import { Profile } from './modules/profile/profile';
import { settings } from './private-settings';

firebase.initializeApp(settings.config);

const profile = new Profile();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        profile.isAuthorized = true;
    } else {
        profile.isAuthorized = false;
    }
});

export const getProfile = functions.https.onRequest((request, response) => {
    profile.getProfile.call(profile, request, response);
});
export const logIn = functions.https.onRequest((request, response) => {
    authService.logIn(request, response, profile);
});
export const logOut = functions.https.onRequest((request, response) => {
    authService.logOut(request, response, profile);
});
