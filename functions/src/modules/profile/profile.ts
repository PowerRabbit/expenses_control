import * as firebase from "firebase";
import { authService } from '../auth/auth-service';
import { errors } from "../errors/errors";

class User {

    public userName: any;
    public startTime: string;
    public endTime: string;
    public currentAmount: number;
    public expectedAmount: number;

    constructor (currentUser) {
        this.userName = currentUser;
        this.startTime = '';
        this.endTime = '';
        this.currentAmount = 0;
        this.expectedAmount = 0;
    }

}

export class Profile {

    public isAuthorized: boolean;
    private currentUser: any;

    constructor () {
        this.currentUser = firebase.auth().currentUser;
        this.isAuthorized = !!this.currentUser;
    }

    public getProfile(_request, response) {

        if (this.isAuthorized) {
            response.json(new User(this.currentUser));
        } else {
            authService.informWrongCredentials(response);
        }
    }
}