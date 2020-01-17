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
import { AuthGuard } from './shared/auth/auth.guard';
import { NavbarComponent } from './components/ui-components/navbar/navbar.component'
import { UsersearchresComponent } from './components/others/usersearchres/usersearchres.component'
import { SidenavComponent } from './components/ui-components/sidenav/sidenav.component'
import { Searchres2Component} from './components/others/searchres2/searchres2.component'
import { ArchiveComponent } from './components/others/archive/archive.component'
import { EventsnordComponent } from './components/others/eventsnord/eventsnord.component'

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
    path: "usersearchres",
    component: UsersearchresComponent
  },
  {
    path: "archivesearch",
    component: ArchiveComponent
  },
  {
    path: "sidenav",
    component: SidenavComponent
  },
  {
    path: "searchres2",
    component: Searchres2Component
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
    component: LoginComponent
  },
  {
    path: "1b08dd3d330c927106bba6bb785301c97cf2090ee7b067c685a258eba35a608e",
    component: KeyaddComponent
  },
  {
    path:"academics",
    component:AcademicsComponent
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
    path: "loading",
    component: LoadingComponent
  },
  {
    path: "eventsorg",
    component: EventsOrganizerComponent
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
    component: EventsComponent
  },
  {
    path: "resetpass",
    component: ResetpassComponent
  },
  {
    path: "interests",
    component: InterestsComponent
  },
  {
    path: "commonsignup",
    component: CommonsignupComponent
  },
  {
    path:'searchres',
    component: SearchresComponent
  },
  {
    path: "userprofile",
    component: UserprofileComponent
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
