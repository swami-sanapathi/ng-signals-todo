import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Todo } from '../todo.store';

@Component({
    selector: 'app-todo-item',
    standalone: true,
    template: `
        <li [class.completed]="todo.completed" [class.editing]="editing()">
            <div class="view">
                <input class="toggle" type="checkbox" [checked]="todo.completed" (click)="completeTask.emit(todo.id)" />
                <label (dblclick)="editing.set(true)">{{ todo.name }}</label>
                <button class="destroy" (click)="deleteTask.emit(todo.id)"></button>
            </div>
            <!-- value="{{ todo.name }}" -->
            <input
                class="edit"
                type="text"
                #editTodo
                [value]="todo.name"
                [hidden]="editing()"
                (keyup.enter)="update(editTodo.value, todo.id)"
                (blur)="update(editTodo.value, todo.id)"
            />
        </li>
    `
})
export class TodoItem {
    @Input() todo!: Todo;
    @Output() deleteTask = new EventEmitter<number>();
    @Output() updateTask = new EventEmitter<{ name: string; id: number }>();
    @Output() completeTask = new EventEmitter<number>();
    editing = signal(false);

    update(name: string, id: number) {
        this.updateTask.emit({ name, id });
        this.editing.set(false);
    }
}
