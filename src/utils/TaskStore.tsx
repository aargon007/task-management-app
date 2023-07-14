'use client'
import { types, flow } from 'mobx-state-tree';

export const Task = types.model('Task', {
    title: types.string,
    description: types.string,
    status: types.string,
});

export const TaskStore = types
    .model('TaskStore', {
        tasks: types.array(Task),
    })

    .actions((self) => ({
        saveTasksToLocalStorage: flow(function* saveTasksToLocalStorage() {
            const saveTask = JSON.stringify(self.tasks);
            localStorage.setItem('tasks', saveTask);
        }),
        loadTasksFromLocalStorage: flow(function* loadTasksFromLocalStorage() {
            if (typeof window !== 'undefined' && localStorage.getItem) {
                const tasksData = localStorage.getItem('tasks');
                if (tasksData) {
                    self.tasks = JSON.parse(tasksData);
                }
            }
        }),
    }))

    .actions((self) => ({
        addTask: flow(function* (task: typeof Task.Type) {
            self.tasks.push(task);
            yield self.saveTasksToLocalStorage();
        }),
        updateTask: flow(function* (index: number, task: typeof Task.Type) {
            self.tasks[index] = task;
            yield self.saveTasksToLocalStorage();
        }),
        deleteTask: flow(function* (index) {
            self.tasks.splice(index, 1);
            yield self.saveTasksToLocalStorage();
        }),
    }))

const store = TaskStore.create({
    tasks: [],
});

store.loadTasksFromLocalStorage();

export default store;
