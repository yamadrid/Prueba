import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from '../services/basic.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  constructor(private route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: string = localStorage.getItem('info') as string;
      if (!isNullOrUndefined(token)){
        const token2 = JSON.parse(token);
        if (!isNullOrUndefined(token2)){
          this.route.navigate(['home']);
          return false;
        }
      }
      return true;
  }
  
}
