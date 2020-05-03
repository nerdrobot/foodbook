import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/internal/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "~/app/components/private/auth/user.model";

const FIREBASE_API_KEY = 'AIzaSyCZPApRO-TrDhPuUQj6PovDDSDgT_10PUA';


interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userBehaviorSubject = new BehaviorSubject<any>(null);
    public user = this.userBehaviorSubject.asObservable();
    private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    constructor(private http: HttpClient) {
    }

    login(email: string, password) {
        return this.http.post<AuthResponseData>(this.signInUrl + FIREBASE_API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .pipe(catchError(errorResponse => {
                    this.handleError(errorResponse.error.error.message);
                    return throwError(errorResponse);
                }),
                tap(response => {
                    this.userBehaviorSubject.next({email: email});
                    if (response && response.idToken) {
                        const expirationDate = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
                        const user = new User(email, response.localId, response.idToken, expirationDate);
                        // this.userBehaviorSubject.next(user);
                    }
                }));
    }

    logout() {
        this.userBehaviorSubject.next(null);

    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'INVALID_EMAIL':
                alert('The email address or password is not valid');
                break;
            case 'INVALID_PASSWORD':
                alert('The email address or password is not valid');
                break;
            default:
                alert('Authentication failed, check your credentials.')
        }
    }

}
