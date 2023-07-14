'use client'
import { types, flow, getRoot } from 'mobx-state-tree';
import { createContext, useContext, ReactNode } from 'react';

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
            const tasksData = localStorage.getItem('tasks');
            if (tasksData) {
                self.tasks = JSON.parse(tasksData);
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
        deleteTask: flow(function* (index: number) {
            self.tasks.splice(index, 1);
            yield self.saveTasksToLocalStorage();
        }),
    }))

// Create a context to hold the store instance
type TaskStoreType = typeof TaskStore.Type;
const StoreContext = createContext<TaskStoreType | null>(null);

// Create a wrapper component to provide the store to the app
export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = TaskStore.create({ tasks: [] });
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// Custom hook to access the store
export const useStore = (): TaskStoreType => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

// const store = TaskStore.create({
//     tasks: [],
// });

// store.loadTasksFromLocalStorage();

// export default store;
