import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoStore } from './todo.store';

@Component({
    selector: 'app-todos',
    standalone: true,
    template: `
        <header class="header">
            <h1>todos</h1>
            @defer (on immediate) {
                <app-new-todo (addTask)="store.add($event)" />
            }
            <section class="main">
                @defer (when store.filteredTodos().length > 0) {
                    <app-todo-list
                        [todos]="store.filteredTodos()"
                        (deleteTask)="store.delete($event)"
                        (completeTask)="store.complete($event)"
                        (updateTask)="store.update($event)"
                    />
                }
            </section>
            @defer (when store.todos().length > 0) {
                <app-todo-footer [store]="store" />
            }
        </header>
    `,
    providers: [TodoStore],
    imports: [TodoListComponent, NewTodoComponent, TodoFooterComponent]
})
export default class TodosComponent implements OnInit {
    store = inject(TodoStore);
    private router = inject(ActivatedRoute);

    ngOnInit() {
        this.store.init();
        this.router.params.subscribe((params) => {
            this.store.filter.set(params['filter']);
        });
    }
}
