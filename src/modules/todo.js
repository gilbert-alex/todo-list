

export default class Todo {
    #title;
    #description;
    #dueDate;
    #priority;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
    }

    get title() {
        console.log('class getter method fired');
        return this.#title;
    }

    getInfo() {
        return {
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            priority: this.#priority
        };
    }
}