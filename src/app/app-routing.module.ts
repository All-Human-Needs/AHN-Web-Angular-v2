import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InputSystemComponent } from './components/input-system/input-system.component';
import { ClientMapsComponent } from './components/client/client-maps/client-maps.component';
import { BusinessStatsComponent } from './components/business/business-stats/business-stats.component';
import { BusinessHomeComponent } from './components/business/business-home/business-home.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'client-home',
    component: ClientHomeComponent
  },
  {
    path: 'business-home',
    component: BusinessHomeComponent
  },
  {
    path: 'business-statistics',
    component: BusinessStatsComponent
  },
  {
    path: 'client-maps',
    component: ClientMapsComponent
  },
  {
    path: 'input-system',
    component: InputSystemComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },{
    path:'forgot-password',
    component:ForgotPasswordComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
