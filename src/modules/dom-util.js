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

// export function closeDialog(dialog) {

// }