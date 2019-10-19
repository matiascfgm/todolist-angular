import { Injectable } from '@angular/core';
import { Task } from './interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks: Task[] = [
    {name: 'find nemo', done: false, id: 1},
    {name: 'walk the fish', done: false, id: 2},
    {name: 'shave the cactus', done: false, id: 3},
  ];

  private static nextId: number = 4;

  public static createUniqueId(): number {
    return TaskService.nextId++;
  }
}
