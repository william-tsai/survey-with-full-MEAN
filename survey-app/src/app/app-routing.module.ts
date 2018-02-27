import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollComponent } from './poll/poll.component';
import { AddPollComponent } from './add-poll/add-poll.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: '#dashboard', component: DashboardComponent},
  { path: '#poll/:id', component: PollComponent},
  { path: '#create', component: AddPollComponent},
  // { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '#dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
