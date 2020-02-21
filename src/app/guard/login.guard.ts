import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) this.router.navigate(['home']);
    return user === null;
  }

}
