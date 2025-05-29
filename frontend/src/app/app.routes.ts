import { Routes } from '@angular/router';
import {RegisterComponent} from './components/pages/register/register.component';
import {LoginComponent} from './components/pages/login/login.component';
import {LayoutComponent} from './components/layouts/dashboard-layout/layout/layout.component';

export const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: LayoutComponent
  }
];
