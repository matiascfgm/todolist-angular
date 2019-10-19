import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';


const routes: Routes = [
  {path: '', component: ToDoListComponent},
  {path: 'edit/:id', component: EditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
