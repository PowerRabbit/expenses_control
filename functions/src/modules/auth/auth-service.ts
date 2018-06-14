import * as firebase from "firebase";
import { Profile } from '../profile/profile';
import { errors } from "../errors/errors";

export const authService = {

    informWrongCredentials: (response, error?) => {
        response.status = 401;
        response.json({
            error: errors.notAuthorized,
            additionalInfo: error
        });
    },

    logIn: (request, response, profile: Profile) => {
        console.log(request.body);

        const params = request.body || {};
        const email = params.email;
        const password = params.password;

        if (email && password) {
            firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
                authService.informWrongCredentials(response, error);
            });
        } else {
            authService.informWrongCredentials(response);
        }
        
    },

    logOut: () => {
        
    }
}