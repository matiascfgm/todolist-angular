import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  
  @Input() // permite que 'task' se pueda definir desde FUERA
  public task: Task;

  public constructor() {
  }

  public toggleTask(task: Task){
    task.done = !task.done;
    // force angular to reload the component
  }

}
