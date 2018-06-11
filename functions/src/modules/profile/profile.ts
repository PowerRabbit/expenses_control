import * as firebase from "firebase";

export class Profile {

    constructor () {

    }

    public getProfile(request, response) {
        const user = firebase.auth().currentUser;
        let message = '';

        if (user) {
            message = 'logged';
        } else {
            message = 'not logged';
        }
        response.send('Hi there!\n\n' + message);
    }
}