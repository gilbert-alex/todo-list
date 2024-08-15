// screen-controller.js

import {projectList} from '../index';
import Project from './project';
import {createNewContainer, addToContainer} from './dom-util'


// A list of unique project values
export function fillNavigation(projectList) {
    const container = document.getElementById('project-sidebar');

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    };

    projectList.map(project => {
        addToContainer(container, project.name);
    });
}


// main function to fill content container with all projects
// and task titles
export function fillContent(projectList) {
    const container = document.getElementById('content');

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    };

    projectList.map( project => {
        const newCard = createNewContainer(
            'card', project.toObject().name, 'project')
        project.toObject().tasks.map(task => 
            addToContainer(newCard, task.name, 'p')
        );
        container.appendChild(newCard);
    });
}

// Nav buttons
export function initNewProject() {
    const open = document.getElementById('newProjectBtn');
    const modal = document.querySelector('#newProjectDialog');
    const form = modal.querySelector('#newProjectForm');
    const close = modal.querySelector('.close');

    open.addEventListener('click', () => {
        form.reset();
        modal.showModal();
    })
    
    close.addEventListener('click', () => {
        new Project(form.querySelector('#newProject-name').value);
        modal.close();
        form.reset();
        fillNavigation(projectList);
        fillContent(projectList);
    })
}