import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean;
  emitLoggedIn = new Subject<boolean>();
  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = false;
  }
  ngOnInit() {
    this.isLoggedIn = false;
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  doLoginWithGoogle() {
    let _self = this;
    this.auth.loginWithGoogle(function (res) {
      if (res)
        _self.isLoggedIn = true;
    });
  }
}
