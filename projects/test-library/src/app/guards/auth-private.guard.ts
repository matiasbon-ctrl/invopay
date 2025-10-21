import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { IpAuthService } from "../invopay/services/ip-auth.service";

export const AuthPrivateGuard: CanActivateFn = (route, state) => {
  const publicRoutes = ['/invopay/login-broker', '/invopay/login-admin'];
  const authService = inject(IpAuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (publicRoutes.includes(state.url)) return true;

  //  Permitir la raíz '' o '/' si hay token
  if ((state.url === '' || state.url === '/') && token && !isTokenExpired(token)) {
    return true;
  }

  if (token && !isTokenExpired(token)) {
    console.log('AuthPrivateGuard: token válido');
    return true;
  }

  console.log('AuthPrivateGuard: token invalido o expirado');
  return router.parseUrl('/invopay/login-broker');
};


// Función para validar expiración JWT
function isTokenExpired(token: string): boolean {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const decoded = JSON.parse(atob(parts[1]));
    if (!decoded.exp) return false;
    return Date.now() > decoded.exp * 1000;
  } catch {
    return true;
  }
}
