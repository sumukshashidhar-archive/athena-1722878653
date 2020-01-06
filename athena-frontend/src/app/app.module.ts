import { BrowserModule } from '@angular/platform-browser';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from "ngx-captcha";
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { TokenInterceptorService } from './shared/token-interceptor.service'
import { HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AchievementsComponent } from './components/students/achievements/achievements.component';
import { DashboardComponent } from './components/students/dashboard/dashboard.component';
import { BigeventsComponent } from './components/students/bigevents/bigevents.component';
import { EventsComponent } from './components/students/events/events.component';
import { SignupComponent } from './components/students/signup/signup.component';
import { InterestsComponent } from './components/students/interests/interests.component';
import { EventsOrganizerComponent } from './components/organizers/events-organizer/events-organizer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizerDashboardComponent } from './components/organizers/organizer-dashboard/organizer-dashboard.component';
import { SignupOrganizerComponent } from './components/organizers/signup-organizer/signup-organizer.component';
import { CommonsignupComponent } from './components/others/commonsignup/commonsignup.component';
import { DiscoverComponent } from './components/others/discover/discover.component';
import { HomePageComponent } from './components/others/home-page/home-page.component';
import { KeyaddComponent } from './components/others/keyadd/keyadd.component';
import { LoadingComponent } from './components/others/loading/loading.component';
import { LoginComponent } from './components/others/login/login.component';
import { OrgverifyemailComponent } from './components/organizers/orgverifyemail/orgverifyemail.component';
import { PagenotfoundComponent } from './components/others/pagenotfound/pagenotfound.component';
import { PasscheckComponent } from './components/others/passcheck/passcheck.component';
import { ResetpassComponent } from './components/others/resetpass/resetpass.component';
import { RunmoduleComponent } from './components/others/runmodule/runmodule.component';
import { UserprofileComponent } from './components/others/userprofile/userprofile.component';
import { VerifyemailComponent } from './components/students/verifyemail/verifyemail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/auth/auth.guard'
import { AuthService } from './shared/auth/auth.service'
import { EventService } from './shared/events/event.service';
import { TransferHttpCacheModule } from '@nguniversal/common'

@NgModule({
  declarations: [
    AppComponent,
    AchievementsComponent,
    DashboardComponent,
    BigeventsComponent,
    EventsComponent,
    SignupComponent,
    InterestsComponent,
    EventsOrganizerComponent,
    OrganizerDashboardComponent,
    SignupOrganizerComponent,
    CommonsignupComponent,
    DiscoverComponent,
    HomePageComponent,
    KeyaddComponent,
    LoadingComponent,
    LoginComponent,
    OrgverifyemailComponent,
    PagenotfoundComponent,
    PasscheckComponent,
    ResetpassComponent,
    RunmoduleComponent,
    UserprofileComponent,
    VerifyemailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MaterialModule,
    AppRoutingModule,
    NgtUniversalModule,
    SelectDropDownModule,
    BrowserAnimationsModule,
    CommonModule,
    RecaptchaModule.forRoot(),
    FormsModule,
    HttpClientModule,
    JwtModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    TransferHttpCacheModule
  ],
  providers: [
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
export class AppModule { }
