import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem("token");

  const isAuthEndpoint = req.url.includes('/user/login') || req.url.includes('/user/register');
  if (isAuthEndpoint) {
    return next(req);
  }

  const url = new URL(req.url, window.location.origin);
  const isPublicEventsGet = req.method === 'GET' && url.pathname.startsWith('/events');
  if (isPublicEventsGet) {
    return next(req);
  }

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(newReq);
};
