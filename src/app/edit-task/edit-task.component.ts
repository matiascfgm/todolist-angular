import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces/task';
import { TaskState } from '../enums/task-state.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private ref: ChangeDetectorRef
    ) {
    
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.task = this.taskService.tasks.find((task) => task.id === id);


    this.form = new FormGroup({
      name: new FormControl(this.task.name, [Validators.maxLength(20), Validators.required]),
      done: new FormControl(this.task.done),
      description: new FormControl(this.task.description)
    });
   }


   public save() {
     console.log('new values: ', this.form.value);
    //  console.log('errors: ', this.form.hasError('required'));

    //  console.log('potato', this.form.get('potato'));

    //  console.log(this.form.get('name').errors);

     console.log(this.hasMaxLength('name'));
     
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
