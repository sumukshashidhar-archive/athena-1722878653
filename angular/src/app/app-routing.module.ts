import { AcademicsComponent } from './components/students/academics/academics.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AchievementsComponent } from './components/students/achievements/achievements.component';
import { DashboardComponent } from './components/students/dashboard/dashboard.component';
import { BigeventsComponent } from './components/students/bigevents/bigevents.component';
import { EventsComponent } from './components/students/events/events.component';
import { SignupComponent } from './components/students/signup/signup.component';
import { InterestsComponent } from './components/students/interests/interests.component';
import { EventsOrganizerComponent } from './components/organizers/events-organizer/events-organizer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchresComponent }from './components/others/searchres/searchres.component'
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
import { AuthGuard } from './shared/auth/auth.guard';
import { NavbarComponent } from './components/ui-components/navbar/navbar.component'
import { UsersearchresComponent } from './components/others/usersearchres/usersearchres.component'
import { SidenavComponent } from './components/ui-components/sidenav/sidenav.component'
import { EventsnordComponent } from './components/students/eventsnord/eventsnord.component'
import { NordComponent } from './components/nord/nord.component'
import { OrgdashboardComponent } from './components/organizers/orgdashboard/orgdashboard.component'

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "eventsdeep",
    component: EventsnordComponent
  },
  {
    path: "orgdashboard",
    component: OrgdashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nord",
    component: NordComponent
  },
  {
    path: "usersearchres",
    component: UsersearchresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sidenav",
    component: SidenavComponent
  },
  {
    path: "verifyemail",
    component: VerifyemailComponent
  },
  {
    path: "orgverifyemail",
    component: OrgverifyemailComponent
  },
  {
    path: "homepage",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path:"academics",
    component:AcademicsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "bigevents",
    component: BigeventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "discover",
    component: DiscoverComponent,
    canActivate: [AuthGuard]
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
    path: "loading",
    component: LoadingComponent
  },
  {
    path: "eventsorg",
    component: EventsOrganizerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "passcheck",
    component: PasscheckComponent
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
    path: "interests",
    component: InterestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "commonsignup",
    component: CommonsignupComponent
  },
  {
    path:'searchres',
    component: SearchresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "userprofile",
    component: UserprofileComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "**",
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
