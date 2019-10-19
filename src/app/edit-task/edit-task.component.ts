import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces/task';
import { TaskState } from '../enums/task-state.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent {

  /**
   * The task being edited
   */
  public task: Task;

  /**
   * The form object is global and can be accessed anywhere.
   */
  public form: FormGroup;

  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private http: ServerService
    ) {
    
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.taskService.tasks$.pipe(
      filter((tasks: Task[]) => !!tasks.length) // filter only the subscription results that have any length
      ).subscribe((tasks) => {
      
        // find the task we want to edit
      this.task = tasks.find((task) => task.id === id);

      // add the form
      this.form = new FormGroup({
        id: new FormControl(this.task.id),
        name: new FormControl(this.task.name, [Validators.maxLength(20), Validators.required]),
        done: new FormControl(this.task.done),
        description: new FormControl(this.task.description)
      });

    })
   }


   public save() {
     if (this.form.invalid) {
       console.log('sorry, form invalid')
       return;
     }

     this.task = this.form.value;
    //  this.taskService.updateTask(this.task.id, this.form.value);
     
   }

   public hasMaxLength(key: string) {
     // define el control
     const control = this.form.get(key);

     // mira si el control existe y tiene errores
     if (control && control.errors && control.errors.maxlength) {
       
       // devuelve el numero de caracteres (siempre es POSITIVO, y positivo == true)
        return control.errors.maxlength.actualLength;
     }

     // no hay errores.
     return false;
   }
}
