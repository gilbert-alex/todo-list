// project.js

import Todo from './todo'

export default class Project {
    #name;
    #tasks;
    
    constructor(name) {
        this.#name = name;
        this.#tasks = [];

        // add this to array in global namespace
        localStorage.setItem(this.name, this.tasks);
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get tasks() {
        return this.#tasks;
    }

    toObject() {
        return {
            name: this.name,
            tasks: this.tasks.map( task => {
                return task.getInfo();
            })
        };
    }

    toJSON() {
        return JSON.stringify(this.toObject());
    }

    addTask(newTodo) {
        if (newTodo instanceof Todo) {
            this.#tasks.push(newTodo.toJSON());
        } else {
            console.log(`Type: ${typeof newTodo} is invalid`);
        }
    }

}