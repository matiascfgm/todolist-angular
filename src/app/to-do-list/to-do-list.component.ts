import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Task } from '../interfaces/task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent {

  public constructor(public taskService: TaskService) {
  }


  public addTask(taskName: string){
    if(taskName){
      this.taskService.tasks.push({name: taskName, done: false, id: TaskService.createUniqueId()} as Task);
    }else{
      console.log('EMPTY!');
    }

  }

}
