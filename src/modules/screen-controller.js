// screen-controller.js

import {projectList, filterList} from '../index';
import Project from './project';
import Todo from './todo'
import {updateScreen, populateInputs, loadIcons} from './dom-util'


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
const taskModal = document.querySelector('#editProjectDialog');
const editTaskForm = taskModal.querySelector('#editTaskForm');
const taskInputs = taskModal.querySelectorAll('input');
const editTaskClose = taskModal.querySelector('.close');


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


// Filter Projects
sidebar.addEventListener('click', e => {
    const newIndex = e.target.dataset.index;

    filterList.includes(newIndex) ?
        filterList.splice(filterList.indexOf(newIndex), 1) :
        filterList.push(newIndex);

    updateScreen(projectList, content, sidebar, filterList);
})


// CRUD
content.addEventListener('click', e => {

    const target = e.target
    const operation = target.name
    const projectIndex = target.dataset.projectIndex
    const taskIndex = target.dataset.taskIndex

    // Create
    if (operation === 'add') {
        editTaskClose.dataset.projectIndex = projectIndex;
        editTaskClose.dataset.taskIndex = taskIndex;
        editTaskClose.dataset.operation = operation;
        taskModal.showModal();

    // Update
    } else if (operation === 'edit') {
        // save clicked index on close btn
        editTaskClose.dataset.projectIndex = projectIndex;
        editTaskClose.dataset.taskIndex = taskIndex;
        editTaskClose.dataset.operation = operation;
        // load details from memory
        populateInputs(projectList, projectIndex, taskIndex, taskInputs);
        taskModal.showModal();

    // Delete
    } else if (operation === 'delete') {

        // delete entire project
        if (!target.dataset.taskIndex) {
            projectList.splice(projectIndex, 1);
        // delete individual task
        } else {
            projectList[projectIndex].tasks.splice(taskIndex, 1);
        }
        updateScreen(projectList, content, sidebar, filterList)

    } else {
        console.log('unrecognized button');
    }
})

// handle close of edit task
taskModal.addEventListener('click', e => {
    const target = e.target;
    const name = target.name;

    if (name === 'close') {
        const operation = editTaskClose.dataset.operation;
        const projectIndex = editTaskClose.dataset.projectIndex;
        const taskIndex = editTaskClose.dataset.taskIndex;

        if (operation === 'add') {
            const targetProject = projectList[projectIndex];

            const buffer = {}
            taskInputs.forEach(input => {
                buffer[input.name] = input.value;
            });

            const newTask = new Todo(
                buffer.name,
                buffer.description,
                buffer.dueDate,
                buffer.priority
            )

            console.log(newTask);
            targetProject.addTask(newTask);
            
        } else if (operation === 'edit') {
            const targetProject = projectList[projectIndex];
            const targetTask = targetProject.tasks[taskIndex];

            // update task
            taskInputs.forEach(input => {
                targetTask[input.name] = input.value;
            });
        } else {
            console.log('unrecognized operation');
        }

        taskModal.close()
        editTaskForm.reset()
        updateScreen(projectList, content, sidebar, filterList)
    } else if (name === 'cancel') {
        taskModal.close()
        editTaskForm.reset()
        updateScreen(projectList, content, sidebar, filterList)
    } else {
        return
    }
})

// test to add MDI to add buttons
document.addEventListener('DOMContentLoaded', function() {
    loadIcons();
});
