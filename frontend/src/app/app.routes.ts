import { Routes } from '@angular/router';
import {RegisterComponent} from './components/pages/register/register.component';
import {LoginComponent} from './components/pages/login/login.component';
import {LayoutComponent} from './components/layouts/dashboard-layout/layout/layout.component';
import {
  ListCategoriesComponent
} from './components/pages/dashboard/categories/list-categories/list-categories.component';
import {EventListComponent} from './components/pages/dashboard/events/event-list/event-list.component';

import {EventFormComponent} from './components/pages/dashboard/events/event-form/event-form.component';
import {ClientsListComponent} from './components/pages/dashboard/clients/clients-list/clients-list.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ClientLayoutComponent} from './components/layouts/client-layout/client-layout.component';
import {EventsComponent} from './components/pages/events/events.component';
import {EventDetailsComponent} from './components/pages/event-details/event-details.component';
import {ProfileComponent} from './components/pages/profile/profile.component';

export const routes: Routes = [
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "events",
        component: EventsComponent
      },
      {
        path: "events/:idEvent",
        component: EventDetailsComponent
      },
      {
        path: "client/profile",
        component: ProfileComponent
      }
    ]
  },
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
    component: LayoutComponent,
    children: [
      {
        path: "categories",
        component: ListCategoriesComponent
      },
      {
        path: "events",
        component: EventListComponent
      },
      {
        path: "create-event",
        component: EventFormComponent
      },
      {
        path: "clients",
        component: ClientsListComponent
      }
    ]
  }
];
