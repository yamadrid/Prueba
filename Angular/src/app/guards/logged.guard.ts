import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Info } from '../services/api.service';
import { isNullOrUndefined } from '../services/basic.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: string = localStorage.getItem('info') as string;
      if (!isNullOrUndefined(token)){
        const token2 = JSON.parse(token);
        if (!isNullOrUndefined(token2)){
          return true;
        }
      }
      this.route.navigate(['login']);
      return false;
  }
}
