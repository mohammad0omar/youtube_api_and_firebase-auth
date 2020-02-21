import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  credential: any;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
    this.afAuth.authState.subscribe(idToken => {
      // console.log(idToken)
    })
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  async  loginWithGoogle() {
    let self = this;
    return new Promise((resolve, reject) => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/youtube');
      provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
      this.afAuth.auth.signInWithPopup(provider).then(res => {
        self.credential = res.credential;
        // localStorage.setItem()
        // console.log(credential.accessToken);
        console.log(self.credential)
        localStorage.setItem('accessToken', this.credential.accessToken);
        this.router.navigate(['home']);
        resolve(true);
      });
      resolve(false);
    });

  }
  async logout() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut().then(res => {
        localStorage.clear();
        this.router.navigate(['login']);
        resolve(true);
      });
      resolve(false);
    })
  }
}
