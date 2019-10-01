import * as firebase from "firebase";
import { authService } from '../auth/auth-service';
import { Request, Response } from 'express';

class User {

    public userName: string;
    public startTime: string;
    public endTime: string;
    public currentAmount: number;
    public expectedAmount: number;

    constructor(currentUser: firebase.User) {
        this.userName = currentUser.displayName;
        this.startTime = '';
        this.endTime = '';
        this.currentAmount = 0;
        this.expectedAmount = 0;
    }

}

export class Profile {

    public isAuthorized: boolean;
    private currentUser: firebase.User;

    constructor() {
        this.currentUser = firebase.auth().currentUser;
        this.isAuthorized = !!this.currentUser;
    }

    public getProfile(_request: Request, response: Response) {

        if (this.isAuthorized) {
            response.json(new User(this.currentUser));
        } else {
            authService.informWrongCredentials(response);
        }
    }
}