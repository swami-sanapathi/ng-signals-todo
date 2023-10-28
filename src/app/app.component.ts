import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewTodoComponent } from './todo/new-todo/new-todo.component';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
        <section class="todoapp">
            <router-outlet />
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>
                Github link
                <a href="http://todomvc.com"></a>
            </p>
            <p>
                Part of
                <a href="http://todomvc.com">TodoMVC</a>
            </p>
        </footer>
    `,
    imports: [RouterOutlet, NewTodoComponent]
})
export class AppComponent {
    title = 'todo-ng-signals';
}
