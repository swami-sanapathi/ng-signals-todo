import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-new-todo',
    template: `
        <input
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus
            #newTask
            (keyup.enter)="trimTask(newTask.value); newTask.value = ''"
        />
    `
})
export class NewTodoComponent {
    @Output() addTask = new EventEmitter<string>();

    trimTask(text: string) {
        if (text && text.trim()) {
            this.addTask.emit(text.trim());
        }
    }
}
