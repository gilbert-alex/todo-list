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

    addTask(todo) {
        if (todo instanceof Todo) {
            this.#tasks.push(todo);
        } else {
            console.log('Invalid todo instance');
        }
    }

    taskTitles() {
        return this.#tasks.map( t => {return t.title});
    }

    taskDetails() {
        return this.#tasks.map( t => {return t.getInfo()});
    }
}