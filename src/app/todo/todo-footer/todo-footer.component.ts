import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoStore } from '../todo.store';

@Component({
    selector: 'app-todo-footer',
    standalone: true,
    template: `
        <footer class="footer">
            <span class="todo-count">
                <strong>{{ store.pending() }}</strong>
                item left
            </span>
            <ul class="filters">
                <li>
                    <a routerLink="/all" [class.selected]="store.filter() === 'all'">All</a>
                </li>
                <li>
                    <a routerLink="/active" [class.selected]="store.filter() === 'active'">Active</a>
                </li>
                <li>
                    <a routerLink="/completed" [class.selected]="store.filter() === 'completed'">Completed</a>
                </li>
            </ul>

            @if (store.completed() > 0) {
            <button class="clear-completed" (click)="store.clearCompleted()">Clear completed</button>
            }
        </footer>
    `,
    imports: [RouterLink]
})
export class TodoFooterComponent {
    @Input() store!: TodoStore;
}
