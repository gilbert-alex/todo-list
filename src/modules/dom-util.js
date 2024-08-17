// DOM utilities

export function createNewContainer(element = 'div', name = '', index = '', newClass = '') {
    const newElement = document.createElement(element);
    if (name) {
        newElement.textContent = name;
        newElement.dataset.name = name.replaceAll(' ','-').toLowerCase();
    }
    if (index || index === 0) {
        newElement.dataset.index = index;
    }
    if (newClass) {
        newElement.classList.add(newClass);
    }
    return newElement;
}

// multi purpose util to insert item from memory to a dom element
export function addToContainer(container, item, index, element = 'div') {
    const newElement = document.createElement(element);
    newElement.textContent = item;
    newElement.dataset.index = index;
    container.appendChild(newElement);
}

// specific dom creation func for project title in the #content
export function createProjectHeader(title, index) {

    const newHeader = document.createElement('div');
    newHeader.classList.add('header');

    const newTitle = document.createElement('h3');
    newTitle.textContent = title;

    const addBtn = document.createElement('button');
    addBtn.textContent = addBtn.name = 'add';
    addBtn.dataset.projectIndex = index;

    const delBtn = document.createElement('button');
    delBtn.textContent = delBtn.name = 'delete';
    delBtn.dataset.projectIndex = index;

    newHeader.appendChild(newTitle);
    newHeader.appendChild(addBtn);
    newHeader.appendChild(delBtn);
    return newHeader
}

// specific dom creation func for task title in #content
export function createProjectTasks(project, projectIndex) {

    // init container
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('tasks');
    
    // access the tasks array of Todo objects
    project.toObject().tasks.map((task, taskIndex) => {

        // add task titles to p element
        addToContainer(dataDiv, task.name, taskIndex, 'p');

        // edit btn
        const editBtn = document.createElement('button');
        editBtn.textContent = editBtn.name = 'edit';
        editBtn.dataset.projectIndex = projectIndex;
        editBtn.dataset.taskIndex = taskIndex;
        dataDiv.appendChild(editBtn);

        // delete btn
        const delBtn = document.createElement('button');
        delBtn.textContent = delBtn.name = 'delete';
        delBtn.dataset.projectIndex = projectIndex;
        delBtn.dataset.taskIndex = taskIndex;
        dataDiv.appendChild(delBtn);
    });

    return dataDiv
}