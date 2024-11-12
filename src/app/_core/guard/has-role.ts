
import { AuthService } from "../../public/auth/auth.service";
import { inject } from "@angular/core";
import { Role } from "../../public/auth/auth-models";
import { CanActivateFn, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";


export const hasRoleGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const user = inject(AuthService)
    const userRole = [user.getRole()]
    const expectedRoles: Role[] = route.data['roles'];
    const hasRole: boolean = expectedRoles.every((role) => userRole.includes(role));
  
    return hasRole || router.navigate(['unauthorized']);
  };