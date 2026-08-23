import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-form.html',
  styleUrl: './add-task-form.css',
})

export class AddTaskForm {
  private fb = new FormBuilder();

  form = this.fb.group({
    title: ['', Validators.required],
  });

  submitted = output<string>();

  onSubmit() {
    if (this.form.invalid) return;
    this.submitted.emit(this.form.value.title!);
    this.form.reset();
  }
}
