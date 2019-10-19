import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Task } from '../interfaces/task';
import { TaskService } from '../task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent {

  public form: FormGroup;

  public constructor(
    public taskService: TaskService,
    private ref: ChangeDetectorRef
  ) {
    //this.form.value == { id: 4, name: "blabla", done: false }

    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      done: new FormControl(null)
    });

    // set default values to display in the HTML
    this.setDefaultFormValues();

    console.log('default name', this.form.value.name);
    console.log('controller', this.form)
  }
  
  
  public save() { 

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const newTask = this.form.value as Task;

    this.taskService.addTask(newTask).subscribe((response) => {

      if (response.success) {
        /**
         * e = [1,2,3];
         * [...e, 4] -> [ "saca las [] de e", 4 ], [ 1,2,3, 4]
         * es como el push. Coge las tasks, las mete en un Array y las "desempaqueta", y luego anade un elemento mas al final
         * @param task 
         */
        this.taskService.tasks$.next([...this.taskService.tasks, newTask]);

        // reset AFTER saving form
        this.setDefaultFormValues();

      } else {
        alert('sorry, weird error happened. try again');
      }
    })

  }

  // Sets the default values of the elements in the form, to create a new task.
  public setDefaultFormValues() {
    this.form.get('id').setValue(TaskService.createUniqueId());
    this.form.get('name').setValue('');
    this.form.get('done').setValue(false);
    this.form.markAsUntouched();
  }
}
