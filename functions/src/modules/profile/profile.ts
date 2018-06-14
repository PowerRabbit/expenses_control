import * as firebase from "firebase";
import { errors } from "../errors/errors";

export class Profile {

    public isAuthorized: boolean;

    constructor () {
        this.isAuthorized = !!firebase.auth().currentUser;
    }

    public getProfile(request, response) {
        let message = '';

        if (this.isAuthorized) {
            message = 'logged';
        } else {
            message = errors.notAuthorized.message;
            response.status = 401;
        }
        
        response.send('Hi there!\n\n' + message);
    }
}