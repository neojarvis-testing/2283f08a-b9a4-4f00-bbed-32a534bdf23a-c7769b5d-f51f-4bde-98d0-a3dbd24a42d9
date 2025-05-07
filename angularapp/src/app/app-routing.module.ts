import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminaddworkoutComponent } from './components/adminaddworkout/adminaddworkout.component';
import { AdminviewworkoutComponent } from './components/adminviewworkout/adminviewworkout.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path:'adminaddworkout',component:AdminaddworkoutComponent},
  {path:'adminviewworkout',component:AdminviewworkoutComponent},
  {path:'home-page',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
