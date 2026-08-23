import { Component } from '@angular/core';
import { TaskList } from '../../features/task-list/task-list';

@Component({
  selector: 'app-home',
  imports: [TaskList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
