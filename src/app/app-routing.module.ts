import { ClientMapsResolver } from './services/client-maps-resolver.service';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from "./guards/auth.guard";
import { ForgotPasswordComponent } from "./components/login/forgot-password/forgot-password.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { InputSystemComponent } from "./components/input-system/input-system.component";
import { ClientMapsComponent } from "./components/client/client-maps/client-maps.component";
import { BusinessStatsComponent } from "./components/business/business-stats/business-stats.component";

import { ClientHomeComponent } from "./components/client/client-home/client-home.component";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/main/dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "main",
    children: [
      // {
      //   path: "client-home",
      //   component: ClientHomeComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: "business-home",
      //   component: BusinessHomeComponent,
      //   canActivate: [AuthGuard]
      // },
      {
        path: "dashboard",
        component: MainComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "business-statistics",
        component: BusinessStatsComponent,
        canActivate: [AuthGuard]
      }, {
        path: "client-maps",
        component: ClientMapsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "client-maps/:filter",
        component: ClientMapsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "input-system",
        component: InputSystemComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "registration",
        component: RegistrationComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "**",
        redirectTo: "/main/dashboard",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/main/dashboard",
    pathMatch: "full"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers:[ClientMapsResolver]
})
export class AppRoutingModule {}
