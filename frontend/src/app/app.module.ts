import { TokenInterceptorService } from "./shared/token-interceptor.service";
import * as jwt_decode from "jwt-decode";
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { ResetpassComponent } from "./components/resetpass/resetpass.component";
import { SignupComponent } from "./components/students/signup/signup.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { AchievementsComponent } from "./components/students/achievements/achievements.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { SignupOrganizerComponent } from "./components/organizers/signup-organizer/signup-organizer.component";
import { NgxCaptchaModule } from "ngx-captcha";
import { ReactiveFormsModule } from "@angular/forms";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { EventService } from "./shared/events/event.service";
import { DashboardComponent } from "./components/students/dashboard/dashboard.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";
import { EventsComponent } from "./components/students/events/events.component";
import { Signup2Component } from "./components/students/signup2/signup2.component";
import { CommonsignupComponent } from "./components/commonsignup/commonsignup.component";
import { OrganizerDashboardComponent } from "./components/organizers/organizer-dashboard/organizer-dashboard.component";
import { EventsOrganizerComponent } from "./components/organizers/events-organizer/events-organizer.component";
import { AdminLoginComponent } from "./components/admin/admin-login/admin-login.component";
import { AdminDashComponent } from "./components/admin/admin-dash/admin-dash.component";
import { SecurityComponent } from "./components/students/security/security.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { PasscheckComponent } from "./components/passcheck/passcheck.component";
import { DeleteUserComponent } from "./components/students/delete-user/delete-user/delete-user.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { BigeventsComponent } from './components/students/bigevents/bigevents.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { KeyaddComponent } from './keyadd/keyadd.component';
import { RunmoduleComponent } from './runmodule/runmodule.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const appRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "homepage",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "1b08dd3d330c927106bba6bb785301c97cf2090ee7b067c685a258eba35a608e",
    component: KeyaddComponent
  },
  {
    path: "f8ff5cec5f99f6cbf3a6533ee75627d1c25091dd1d22593ac14e02bc9e97368e",
    component: RunmoduleComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "bigevents",
    component: BigeventsComponent
  },
  {
    path: "discover",
    component: DiscoverComponent
  },
  {
    path: "achievements",
    component: AchievementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signuporganizer",
    component: SignupOrganizerComponent
  },
  {
    path: "organizerdashboard",
    component: OrganizerDashboardComponent
  },
  {
    path: "delete",
    component: DeleteUserComponent
  },
  {
    path: "loading",
    component: LoadingComponent
  },
  {
    path: "eventsorg",
    component: EventsOrganizerComponent
  },
  {
    path: "admindash",
    component: AdminDashComponent
  },
  {
    path: "adminlog",
    component: AdminLoginComponent
  },
  {
    path: "passcheck",
    component: PasscheckComponent
  },
  {
    path: "security",
    component: SecurityComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "resetpass",
    component: ResetpassComponent
  },
  {
    path: "signup2",
    component: Signup2Component
  },
  {
    path: "commonsignup",
    component: CommonsignupComponent
  },
  {
    path: "userprofile",
    component: UserprofileComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: "**",
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AchievementsComponent,
    HomePageComponent,
    SignupOrganizerComponent,
    DashboardComponent,
    EventsComponent,
    Signup2Component,
    ResetpassComponent,
    PasscheckComponent,
    CommonsignupComponent,
    OrganizerDashboardComponent,
    EventsOrganizerComponent,
    AdminLoginComponent,
    AdminDashComponent,
    SecurityComponent,
    DeleteUserComponent,
    LoadingComponent,
    BigeventsComponent,
    DiscoverComponent,
    KeyaddComponent,
    RunmoduleComponent,
    UserprofileComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:4000"],
        blacklistedRoutes: ["localhost:4000/api/auth"]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxCaptchaModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    Title,
    EventService,
    AuthGuard,
    AuthService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
