// project.js
import Todo from './todo'

export default class Project {
    #name;
    #tasks;
    
    constructor(name) {
        this.#name = name;
        this.#tasks = [];
    }

    get name() {
        return this.#name;
    }

    get tasks() {
        return this.#tasks;
    }

    getSelf() {
        return {
            name: this.name,
            tasks: this.tasks
        };
    }

    addTask(newTodo) {
        if (newTodo instanceof Todo) {
            this.#tasks.push(newTodo);
        } else {
            console.log('Invalid Todo instance');
        }
    }
    
}