import * as firebase from "firebase";
import { errors } from "../errors/errors";
import { Profile } from "../profile/profile";
import { Request, Response } from 'express';

export const authService = {

    informWrongCredentials: (response: Response, error?: string) => {
        response.status(401);
        response.json({
            additionalInfo: error,
            error: errors.notAuthorized
        });
    },

    logIn: (request: Request, response: Response, profile: Profile) => {
    //    console.log(request.body);

        const params = request.body || {};
        const email = params.email;
        const password = params.password;

        if (email && password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                profile.isAuthorized = true;
                response.json({});
            })
            .catch((error) => {
                authService.informWrongCredentials(response, error);
            });
        } else {
            authService.informWrongCredentials(response);
        }
    },

    logOut: (_request: Request, response: Response, profile: Profile) => {
        firebase.auth().signOut()
        .then(() => {
            profile.isAuthorized = false;
            response.json({});
        })
        .catch((error) => {
            response.json({
                additionalInfo: error,
                error: errors.notLoggeOut
            });
        });
    }
}