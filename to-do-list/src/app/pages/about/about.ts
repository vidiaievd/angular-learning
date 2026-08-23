import { Component, inject } from '@angular/core';
import { TaskStore } from '../../features/task-list/task-store';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  store = inject(TaskStore);
}
