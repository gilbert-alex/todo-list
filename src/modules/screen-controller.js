// screen-controller.js

import {createNewContainer, addToContainer} from './dom-util'

// init functionality
export function init() {
    const modal = document.querySelector('dialog');

    const newProjectOpen = document.getElementById('newProjectOpen');
    newProjectOpen.addEventListener('click', () => {
        modal.showModal();
    })

    const newProjectClose = document.getElementById('newProjectClose');
    newProjectClose.addEventListener('click', () => {
        modal.close();
    })
}

// A list of unique project values
export function fillNavigation(projects) {
    const container = document.getElementById('project-sidebar');
    projects.map(project => {
        addToContainer(container, project.name);
    });
}


// main function to fill content container with all projects
// and task titles
export function fillContent(projects) {
    const container = document.getElementById('content');
    projects.map( project => {

        const newCard = createNewContainer(
            'card', project.toObject().name, 'project')

        project.toObject().tasks.map(task => 
            addToContainer(newCard, task.name, 'p')
        );
        container.appendChild(newCard);
    });
}