import { Injectable, inject } from '@angular/core';
import { httpResource, HttpClient } from '@angular/common/http';
import { Task } from './task.model';

const API_URL = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private http = inject(HttpClient);

  tasksResource = httpResource<Task[]>(() => API_URL, { defaultValue: [] });

  toggleTask(id: number, done: boolean) {
    this.http.patch(`${API_URL}/${id}`, { done: !done }).subscribe(() => {
      this.tasksResource.reload();
    });
  }

  removeTask(id: number) {
    this.http.delete(`${API_URL}/${id}`).subscribe(() => {
      this.tasksResource.reload();
    });
  }

  addTask(title: string) {
    const newTask = { title, done: false };
    this.http.post<Task>(API_URL, newTask).subscribe(() => {
      this.tasksResource.reload();
    });
  }
}
