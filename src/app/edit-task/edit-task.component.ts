import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { TaskService } from '../task.service';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent {

  /**
   * The form object is global and can be accessed anywhere.
   */
  public form: FormGroup = new FormGroup({});

  /**
   * A stream containing a preview of the current task.
   */
  public taskPreview$ = new BehaviorSubject<Task>(null);

  /**
   * The "saved" value of the form (when there are no unsaved changes), saved as a string.
   */
  public formInitialState: string;

  /**
   * Returns TRUE if the form has unsaved changes.
   */
  public get formHasChanges(): boolean{
    return JSON.stringify(this.form.value) !== this.formInitialState;
  } 

  // sets a new state for the preview.
  public set taskPreview(task: Task) {
    // we must provide a COPY of the object, instead of the same object. This is because the changes are only triggered WITH NEW REFERENCES.
    this.taskPreview$.next({...task});
  }

  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute
  ) {

    // the ID of the task we are editing - we read this from the url: /edit/:id -> .get('id')
    const id: string = this.route.snapshot.paramMap.get('id');

    this.taskService.getById(id).subscribe((task) => {

      // update the "preview" of the <app-task>
      this.taskPreview = task;
      
      // add the form
      this.form = new FormGroup({
        id: new FormControl(task.id),
        name: new FormControl(task.name, [Validators.maxLength(20), Validators.required]),
        done: new FormControl(task.done),
        description: new FormControl(task.description)
      });
      // set the inital state of the "unsaved form".
      this.formInitialState = JSON.stringify(this.form.value)    
      
  
      //detect form changes
      this.form.valueChanges.subscribe((values) => {
        // update the preview of the <app-task>
        this.taskPreview = values;        
      });
    })
  }


  /**
   * Save the form, if it's not invalid
   */
  public save() {
    if (this.form.invalid) {
      alert('please correct the errors in the form');
      return;
    }

    // update the values of the taks with the new ones
    this.taskService.updateTask(this.form.value);
    // update the "initial values" of the form
    this.formInitialState = JSON.stringify(this.form.value);
    // update the preview of the <app-task>
    this.taskPreview = this.form.value;
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
