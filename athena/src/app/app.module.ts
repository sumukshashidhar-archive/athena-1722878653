import { BrowserModule } from '@angular/platform-browser';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { CookieService } from "ngx-cookie-service";
import { CommonModule } from '@angular/common';
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
import { SignupOrganizerComponent } from './components/organizers/signup-organizer/signup-organizer.component';
import { CommonsignupComponent } from './components/others/commonsignup/commonsignup.component';
import { DiscoverComponent } from './components/others/discover/discover.component';
import { HomePageComponent } from './components/others/home-page/home-page.component';
import { LoadingComponent } from './components/others/loading/loading.component';
import { LoginComponent } from './components/others/login/login.component';
import { OrgverifyemailComponent } from './components/organizers/orgverifyemail/orgverifyemail.component';
import { PagenotfoundComponent } from './components/others/pagenotfound/pagenotfound.component';
import { PasscheckComponent } from './components/others/passcheck/passcheck.component';
import { ResetpassComponent } from './components/others/resetpass/resetpass.component';
import { UserprofileComponent } from './components/others/userprofile/userprofile.component';
import { VerifyemailComponent } from './components/students/verifyemail/verifyemail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/auth/auth.guard'
import { AuthService } from './shared/auth/auth.service'
import { EventService } from './shared/events/event.service';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { SearchresComponent } from './components/others/searchres/searchres.component';
import { NavbarComponent } from './components/ui-components/navbar/navbar.component';
import { SidenavComponent } from './components/ui-components/sidenav/sidenav.component';
import { AcademicsComponent } from './components/students/academics/academics.component';
import { CarouselComponent } from './components/ui-components/carousel/carousel.component';
import { UsersearchresComponent } from './components/others/usersearchres/usersearchres.component';
import { EventsnordComponent } from './components/students/eventsnord/eventsnord.component';
import { NordComponent } from './components/nord/nord.component';
import { MainNavComponent } from './components/ui-components/main-nav/main-nav.component';
import { OrgdashboardComponent } from './components/organizers/orgdashboard/orgdashboard.component';


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
    SignupOrganizerComponent,
    CommonsignupComponent,
    DiscoverComponent,
    HomePageComponent,
    LoadingComponent,
    LoginComponent,
    OrgverifyemailComponent,
    PagenotfoundComponent,
    PasscheckComponent,
    ResetpassComponent,
    UserprofileComponent,
    VerifyemailComponent,
    SearchresComponent,
    NavbarComponent,
    SidenavComponent,
    AcademicsComponent,
    CarouselComponent,
    UsersearchresComponent,
    EventsnordComponent,
    NordComponent,
    MainNavComponent,
    OrgdashboardComponent,
  ],
  imports: [
    BrowserModule,
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
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
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
