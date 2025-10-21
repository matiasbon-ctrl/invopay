import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { IpAuthService } from "../invopay/services/ip-auth.service";

export const AuthPrivateGuard: CanActivateFn = (route, state) => {
  const publicRoutes = ['/invopay/login-broker', '/invopay/login-admin'];
  const authService = inject(IpAuthService);
  const router = inject(Router);

  // pasan rutas publicas
  if (publicRoutes.includes(state.url)) {
    return true;
  }

  // Solo verifico existencia
  const token = authService.getToken();
  
  if (!token || token.trim() === '') {
    console.log('AuthPrivateGuard: no hay token');
    return router.parseUrl('/invopay/login-broker');
  }

  // Verificar formato básico de JWE (5 partes)
  const parts = token.split('.');
  if (parts.length !== 5) {
    console.log('AuthPrivateGuard: token con formato invalido');
    authService.logOut();
    return router.parseUrl('/invopay/login-broker');
  }

  console.log('AuthPrivateGuard: token valido pasa');
  return true;
};