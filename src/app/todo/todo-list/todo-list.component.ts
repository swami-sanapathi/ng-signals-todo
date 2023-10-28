import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../todo-item/todo-item.component';
import { Todo } from '../todo.store';

@Component({
    standalone: true,
    selector: 'app-todo-list',
    template: `
        <ul class="todo-list">
            @for(todo of todos; track todo.id) {
            <app-todo-item
                [todo]="todo"
                (deleteTask)="deleteTask.emit($event)"
                (completeTask)="completeTask.emit($event)"
                (updateTask)="updateTask.emit($event)"
            />
            }
        </ul>
    `,
    imports: [TodoItem]
})
export class TodoListComponent {
    @Input() todos!: Todo[];
    @Output() deleteTask = new EventEmitter<number>();
    @Output() completeTask = new EventEmitter<number>();
    @Output() updateTask = new EventEmitter<{ name: string; id: number }>();
}
