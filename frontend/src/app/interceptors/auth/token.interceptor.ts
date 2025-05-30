import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem("token");

  if (req.url.includes("/user/login") || req.url.includes("/user/register")) {
    return next(req)
  }

  console.log(token)

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(newReq);
};
