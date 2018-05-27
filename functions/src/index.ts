import * as functions from 'firebase-functions';
import { Profile } from './modules/profile/profile'

const profile = new Profile();

export const getProfile = functions.https.onRequest(profile.getProfile);
