import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = sessionStorage.getItem('email') !== null;
    const userRole = sessionStorage.getItem('role');

    console.log(isLoggedIn)
    //console.log(userRole)

    if (isLoggedIn) {
      const requiredRoles = route.data['roles'];
      console.log('Required Roles:', requiredRoles);
      console.log('User Role:', userRole);


      // Check if roles are defined and match the user's role
      if (requiredRoles && requiredRoles.some((role: string) => role === userRole)) {
        return true;
      } else {
        Swal.fire('Access Denied', `Only ${requiredRoles ? requiredRoles.join(', ') : 'authorized users'} have access`, 'error');
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
