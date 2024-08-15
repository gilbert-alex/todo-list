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

    set name(name) {
        this.#name = name;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    get priority() {
        return this.#priority;
    }

    set priority(priority) {
        this.#priority = priority;
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