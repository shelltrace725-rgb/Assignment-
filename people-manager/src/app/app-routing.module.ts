import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonDeleteComponent } from './components/person-delete/person-delete.component';

const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PersonEditComponent },
  { path: 'people/:id/edit', component: PersonEditComponent },
  { path: 'people/:id/delete', component: PersonDeleteComponent },
  { path: '**', redirectTo: 'people' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
