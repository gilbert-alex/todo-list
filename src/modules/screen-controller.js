// DOM utilities

export function listProjects(element, arr) {
    arr.map( (a, index) => {

        const div = document.createElement('div');
        div.classList.add('project');
        div.dataset.index = index;
        div.textContent = a;
        element.appendChild(div);
    })
}

export function addToContainer(container, item, element = 'div') {
    const div = document.createElement(element);
    div.textContent = item;
    container.appendChild(div);
}