import { Component, inject } from '@angular/core';
import { TaskItem } from './task-item/task-item';
import { AddTaskForm } from './add-task-form/add-task-form';
import { TaskStore } from './task-store';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem, AddTaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  store = inject(TaskStore);
}
