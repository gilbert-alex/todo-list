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

    projectList.map((project, index) => {
        addToContainer(container, project.name, index);
    });
}


// main function to fill content container with all projects
// and task titles
export function fillContent(projectList) {
    const container = document.getElementById('content');

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    };

    projectList.map((project, index)=> {
        const projectDiv = document.createElement('div');
        projectDiv.dataset.index = index;
        projectDiv.classList.add('project');

        const header = document.createElement('div');
        header.classList.add('header');

        const title = document.createElement('h3')
        title.textContent = project.toObject().name;
        header.appendChild(title);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit';
        editBtn.dataset.index = index;
        header.appendChild(editBtn);

        projectDiv.appendChild(header);

        const dataDiv = document.createElement('div');
        project.toObject().tasks.map((task, index) => 
            addToContainer(dataDiv, task.name, index, 'p')
        );
        projectDiv.appendChild(dataDiv);
    
        container.appendChild(projectDiv);
    });
}

// Nav buttons
// ----------------------------------------------------------------------------

// Create new project object on global array and refresh view
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

// Save global projectList to local storage
export function initSave() {
    const saveBtn = document.querySelector('#saveBtn');
    saveBtn.addEventListener('click', () => {
        projectList.map( pl => {
            window.localStorage.setItem(
                pl.toObject().name,
                pl.toObject().tasks
            )
    });
        console.log(window.localStorage);
    })
}

// Edit existing project
export function editProject() {
    const content = document.querySelector('#content');
    const modal = document.querySelector('#editProjectDialog');
    const inputs = modal.querySelectorAll('input');

    content.addEventListener('click', e => {
        const target = e.target
        const index = target.dataset.index

        inputs.forEach( input => {
            const targetValue = input.name;
            input.value = projectList[index].toObject().tasks[0][targetValue];
        });

        modal.showModal();
    })

}