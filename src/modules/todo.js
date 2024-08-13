// todo.js

export default class Todo {
    #name;
    #description;
    #dueDate;
    #priority;

    constructor(name, description, dueDate, priority) {
        this.#name = name;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    // returns an objects
    getInfo() {
        return {
            name: this.name,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority
        };
    }
}