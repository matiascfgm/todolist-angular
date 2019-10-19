import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Task } from './interfaces/task';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  public get tasks(): Task[] {
    return this.tasks$.getValue();
  }

  private static nextId: number = 4;

  public constructor(private http: ServerService) {
    this.getAllTasks().subscribe((tasks) => {
      this.tasks$.next(tasks);
    })
  }

  public static createUniqueId(): number {
    return TaskService.nextId++;
  }

  public updateTask(taskId: number, newTaskValues: Task) {
    const task = this.tasks.find((task) => task.id === taskId)
    task.name = newTaskValues.name;
    task.description = newTaskValues.description;
    task.done = newTaskValues.done;
  }

  public addTask(task: Task) {
    // save to server....
    return this.http.push('http://myserver.com/save-todo', {params: task}); // this is called a 'promise'. You can subscribe to promises
  }

  public delete(task: Task) {
    // save to server....
    return this.http.push('http://myserver.com/save-todo', {params: task.id}); // this is called a 'promise'. You can subscribe to promises
  }

  public getAllTasks(): Observable<Task[]> {
    return this.http.get('http://myserver.com/get-all-tasks');
  }
}
