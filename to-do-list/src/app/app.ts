import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('to-do-list');
  count = signal(0)
  increment() {
    this.count.update(v => v + 1)
  }
  decrement() {
    this.count.update(v => v - 1)
  }
}
