import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from './interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  // fakes a PUSH to the server
  public push(fakeURL, parameters) {
    return of({success: Math.random() > 0.1}).pipe(delay(300))
  }

  public get(fakeURL): Observable<Task[]> {
    return of([
      {name: 'find nemo', done: false, id: 1},
      {name: 'walk the fish', done: false, id: 2},
      {name: 'shave the cactus', done: false, id: 3},
    ]).pipe(delay(1000));
  }
}
