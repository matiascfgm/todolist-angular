import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Task } from './interfaces/task';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  public get tasks(): Task[] {
    return this.tasks$.getValue();
  }

  private static nextId: number = 4;

  public constructor(private db: AngularFirestore) {
    this.getAllTasks().subscribe((tasks) => {
      this.tasks$.next(tasks);
    })
  }

  public static createUniqueId(): number {
    return TaskService.nextId++;
  }

  public updateTask(newTaskValues: Task) {
    this.db.collection('task').doc(newTaskValues.id).update(newTaskValues);
  }

  public getById(id: string): Observable<Task> {
    return this.db.collection<Task>('task').doc(id).snapshotChanges().pipe(
      map( action => {
          return {id: action.payload.id, ...action.payload.data()} as Task
    }))
  }

  public addTask(task: Task) {
    return this.db.collection('task').add(task);
    }

  public deleteTask(task: Task) {
    console.log(task);
    return this.db.collection('task').doc(task.id).delete();
     }

  public getAllTasks(): Observable<Task[]> {
    return this.db.collection<Task>('task').snapshotChanges().pipe(
      map( actions => {
        return actions.map(action => {
          return {id: action.payload.doc.id, ...action.payload.doc.data()}
      })
    }))
  }
}
