// screen-controller.js

import {projectList, filterList} from '../index';
import Project from './project';
import {updateScreen, populateInputs} from './dom-util'


const sidebar = document.querySelector('#project-sidebar');
const content = document.querySelector('#content');
// sidebar buttons
const newProjectBtn = document.getElementById('newProjectBtn');
const newProjectModal = document.querySelector('#newProjectDialog');
const newProjectForm = newProjectModal.querySelector('#newProjectForm');
const newProjectInput = newProjectModal.querySelector('#newProject-name');
const newProjectClose = newProjectModal.querySelector('.close');
const saveBtn = document.querySelector('#saveBtn');
const viewAllBtn = document.querySelector('#viewAllBtn');
// content buttons
const editTaskModal = document.querySelector('#editProjectDialog');
const editTaskForm = editTaskModal.querySelector('#editTaskForm');
const editTaskInputs = editTaskModal.querySelectorAll('input');
const editTaskClose = editTaskModal.querySelector('.close');


// new project button - open
newProjectBtn.addEventListener('click', () => {
    newProjectForm.reset();
    newProjectModal.showModal();
})
    
// new project button - close
newProjectClose.addEventListener('click', () => {
    // error checking
    if (newProjectInput.value.trim() === '') {
        alert('no blanks')
        return
    }
    new Project(newProjectForm.querySelector('#newProject-name').value);
    newProjectModal.close();
    newProjectForm.reset();
    updateScreen(projectList, content, sidebar, filterList);
})


// todo: work on using local storage
saveBtn.addEventListener('click', () => {
    projectList.map( pl => {
        window.localStorage.setItem(
            pl.toObject().name,
            pl.toObject().tasks
        )
});
    console.log(window.localStorage);
})


// clear filter
viewAllBtn.addEventListener('click', () => {
    filterList.length = 0;
    updateScreen(projectList, content, sidebar, filterList);
})


// filter content with nav sidebar btns
sidebar.addEventListener('click', e => {
    const newIndex = e.target.dataset.index;

    filterList.includes(newIndex) ?
        filterList.splice(filterList.indexOf(newIndex), 1) :
        filterList.push(newIndex);

    updateScreen(projectList, content, sidebar, filterList);
})


// handle all btn clicks within content view
content.addEventListener('click', e => {

    const target = e.target
    const projectIndex = target.dataset.projectIndex
    const taskIndex = target.dataset.taskIndex

    // handle delete buttons
    if (target.name === 'delete') {

        // delete entire project
        if (!target.dataset.taskIndex) {
            projectList.splice(projectIndex, 1);
        // delete individual task
        } else {
            projectList[projectIndex].tasks.splice(taskIndex, 1);
        }
        updateScreen(projectList, content, sidebar, filterList)

    // handle edit buttons
    } else if (target.name === 'edit') {
        // save clicked index on close btn
        editTaskClose.dataset.projectIndex = projectIndex;
        editTaskClose.dataset.taskIndex = taskIndex;
        // load details from memory
        populateInputs(projectList, projectIndex, taskIndex, editTaskInputs);
        editTaskModal.showModal();

    } else {
        console.log('unrecognized button');
    }
})

// handle close of edit task
editTaskModal.addEventListener('click', e => {
    const target = e.target;
    const name = target.name;

    if (name === 'close') {
        const projectIndex = editTaskClose.dataset.projectIndex;
        const taskIndex = editTaskClose.dataset.taskIndex;

        const targetProject = projectList[projectIndex];
        const targetTask = targetProject.tasks[taskIndex];

        editTaskInputs.forEach(input => {
            targetTask[input.name] = input.value;
        });

        editTaskModal.close()
        editTaskForm.reset()
        updateScreen(projectList, content, sidebar, filterList)
    } else if (name === 'cancel') {
        editTaskModal.close()
        editTaskForm.reset()
        updateScreen(projectList, content, sidebar, filterList)
    } else {
        return
    }
})