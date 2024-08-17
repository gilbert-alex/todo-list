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

export function addToContainer(container, item, index, element = 'div') {
    const newElement = document.createElement(element);
    newElement.textContent = item;
    newElement.dataset.index = index;
    container.appendChild(newElement);
}

export function createHeader(title, index) {

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
