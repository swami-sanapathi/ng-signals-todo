import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class TodoStore {
    filter = signal<any>('all');
    todos = signal<Todo[]>([]);
    filteredTodos = computed(() => {
        const filter = this.filter();
        switch (filter) {
            default:
            case 'all':
                return this.todos();
            case 'active':
                return this.todos().filter((todo) => !todo.completed);
            case 'completed':
                return this.todos().filter((todo) => todo.completed);
        }
    });
    pending = computed(() => {
        return this.todos().filter((todo) => !todo.completed).length;
    });
    completed = computed(() => this.todos().filter((todo) => todo.completed).length);

    async init() {
        const task = await fetch('../../assets/todos.json').then((response) => response.json());
        this.todos.set([task]);
    }

    add(task: string) {
        this.todos.update((todos) => {
            return [
                ...todos,
                {
                    id: Math.floor(Math.random() * 10000) + 1000,
                    name: task,
                    completed: false,
                    created_at: new Date()
                }
            ];
        });
    }

    delete(id: number) {
        this.todos.update((todos) => [...todos.filter((todo) => todo.id !== id)]);
    }

    update({ id, name }: { id: number; name: string }) {
        this.todos.update((todos) => {
            return [
                ...todos.map((todo) => {
                    if (todo.id === id) {
                        todo.name = name;
                    }
                    return todo;
                })
            ];
        });
    }

    complete(id: number) {
        this.todos.update((todos) => {
            return [
                ...todos.map((todo) => {
                    if (todo.id === id) {
                        todo.completed = !todo.completed;
                    }
                    return todo;
                })
            ];
        });
    }

    clearCompleted() {
        this.todos.update((todos) => [...todos.filter((todo) => !todo.completed)]);
    }
}

export interface Todo {
    id: number;
    name: string;
    completed: boolean;
    created_at: Date;
}
