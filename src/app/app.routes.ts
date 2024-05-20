import { Routes } from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {ContactComponent} from "./page/contact/contact.component";
import { AboutComponent } from './page/about/about.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
  },
  {
    title: 'About',
    path: 'about',
    component: AboutComponent
  },
  {
    title: 'Contact',
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
