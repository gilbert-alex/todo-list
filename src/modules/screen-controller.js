// screen-controller.js

import {createNewContainer, addToContainer} from './dom-util'

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
            'card', 
            project.getSelf().name, 
            'project')

        project.getSelf().tasks.map(task => {
            addToContainer(
                newCard, 
                task.name, 
                'p');

        });
        container.appendChild(newCard);
    });
}


export function logTaskInfo(projects) {
    projects.map( project => {
        console.group;
        console.log(project.getSelf().name);
        project.getSelf().tasks.map( task => {
            console.log(task.name);
        });
        console.groupEnd;
    })
}