// DOM utilities

export function createNewContainer(element, name, newClass) {
    const newElement = document.createElement(element);
    newElement.textContent = name;
    newElement.classList.add(newClass);
    const id = name.replaceAll(' ','-').toLowerCase();
    newElement.classList.add(id);
    return newElement;
}

export function addToContainer(container, item, element = 'div') {
    const newElement = document.createElement(element);
    newElement.textContent = item;
    container.appendChild(newElement);
}

// export function closeDialog(dialog) {

// }