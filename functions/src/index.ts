import * as functions from 'firebase-functions';
import * as firebase from "firebase";
import { authService } from './modules/auth/auth-service';
import { Profile } from './modules/profile/profile';
import { settings } from './private-settings';

firebase.initializeApp(settings.config);

const profile = new Profile();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
});

export const getProfile = functions.https.onRequest(profile.getProfile);
export const logIn = functions.https.onRequest((request, response) => {
    authService.logIn(request, response, profile);
});
