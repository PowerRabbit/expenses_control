import * as functions from 'firebase-functions';
import * as firebase from "firebase";
import { Profile } from './modules/profile/profile'

firebase.initializeApp({}); // config here

const profile = new Profile();

export const getProfile = functions.https.onRequest(profile.getProfile);
