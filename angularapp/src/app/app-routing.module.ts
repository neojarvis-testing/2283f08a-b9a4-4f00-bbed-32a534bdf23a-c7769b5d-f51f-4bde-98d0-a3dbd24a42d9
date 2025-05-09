import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminaddworkoutComponent } from './components/adminaddworkout/adminaddworkout.component';
import { AdmineditworkoutComponent } from './components/admineditworkout/admineditworkout.component';
import { AdminviewworkoutComponent } from './components/adminviewworkout/adminviewworkout.component';
import { ErrorComponent } from './components/error/error.component';
import { RequestedworkoutComponent } from './components/requestedworkout/requestedworkout.component';
import { UserworkoutformComponent } from './components/userworkoutform/userworkoutform.component';
import { UserviewworkoutComponent } from './components/userviewworkout/userviewworkout.component';
import { UserappliedworkoutComponent } from './components/userappliedworkout/userappliedworkout.component';

const routes: Routes = [
  {path:'home-page',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminaddworkout',component:AdminaddworkoutComponent},
  {path:'admineditworkout/:id',component:AdmineditworkoutComponent},
  {path:'adminviewworkout',component:AdminviewworkoutComponent},
  {path:'requestedworkout',component:RequestedworkoutComponent},
  {path:'userappliedworkout/:id',component:UserappliedworkoutComponent},
  {path:'userviewworkout',component:UserviewworkoutComponent},
  {path:'userworkoutform/:id',component:UserworkoutformComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

