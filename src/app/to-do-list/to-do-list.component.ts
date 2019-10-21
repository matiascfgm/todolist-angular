import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Task } from '../interfaces/task';
import { TaskService } from '../task.service';

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
  ) {
    //this.form.value == { id: 4, name: "blabla", done: false }

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      done: new FormControl(null)
    });

    // set default values to display in the HTML
    this.setDefaultFormValues();


  }


  public save() {

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const newTask = this.form.value as Task;

    this.taskService.addTask(newTask);
    // reset AFTER saving form
    this.setDefaultFormValues();

  }

  // Sets the default values of the elements in the form, to create a new task.
  public setDefaultFormValues() {
    this.form.get('name').setValue('');
    this.form.get('done').setValue(false);
    this.form.markAsUntouched();
  }
}
