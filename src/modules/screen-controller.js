// screen-controller.js

import {projectList} from '../index';
import Project from './project';
import {createNewContainer, addToContainer, createHeader} from './dom-util'

const sidebar = document.querySelector('#project-sidebar');
const content = document.querySelector('#content');
// sidebar buttons
const newProjectBtn = document.getElementById('newProjectBtn');
const newProjectModal = document.querySelector('#newProjectDialog');
const newProjectForm = newProjectModal.querySelector('#newProjectForm');
const newProjectInput = newProjectModal.querySelector('#newProject-name');
const newProjectClose = newProjectModal.querySelector('.close');
const saveBtn = document.querySelector('#saveBtn');
// content buttons
const editTaskModal = document.querySelector('#editProjectDialog');
const editTaskForm = editTaskModal.querySelector('#editTaskForm');
const editTaskInputs = editTaskModal.querySelectorAll('input');
const editTaskClose = editTaskModal.querySelector('.close');

// load memory to html
export function updateScreen() {
    
    // callbacks
    const populateSidebar = () => {
        // empty existing dom for refresh
        while (sidebar.firstChild) {
            sidebar.removeChild(sidebar.lastChild);
        }
        // load from memory
        projectList.map((project, index) => {
            addToContainer(sidebar, project.name, index);
        })
    }

    const populateContent = () => {
        // empty existing dom for refresh
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
        // load from memory
        projectList.map((project, projectIndex)=> {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
    
            projectDiv.appendChild(createHeader(
                project.toObject().name, 
                projectIndex
            ));
    
            // project data
            const dataDiv = document.createElement('div');
            dataDiv.classList.add('task');
            project.toObject().tasks.map((task, taskIndex) => {
                addToContainer(dataDiv, task.name, taskIndex, 'p');
                // edit btn
                const editBtn = document.createElement('button');
                editBtn.textContent = editBtn.name = 'edit';
                editBtn.dataset.projectIndex = projectIndex;
                editBtn.dataset.taskIndex = taskIndex;
                dataDiv.appendChild(editBtn);
                // delete btn
                const delBtn = document.createElement('button');
                delBtn.textContent = delBtn.name = 'delete';
                delBtn.dataset.projectIndex = projectIndex;
                delBtn.dataset.taskIndex = taskIndex;
                dataDiv.appendChild(delBtn);
                
            });
            projectDiv.appendChild(dataDiv);

            content.appendChild(projectDiv);
        });
    }
    populateSidebar();
    populateContent();
}

// populate modal input values from memory
const populateInputs = (projectIndex, taskIndex) => {
    const targetProject = projectList[projectIndex];
    const targetTask = targetProject.toObject().tasks[taskIndex];
    editTaskInputs.forEach( input => {
        input.value = targetTask[input.name] || '';
    })
}

export function initListeners() {

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
        updateScreen();
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

    // handle all btn clicks within content view
    content.addEventListener('click', e => {
        const target = e.target
        const projectIndex = target.dataset.projectIndex
        const taskIndex = target.dataset.taskIndex

        if (target.name === 'delete') {
            projectList[projectIndex].tasks.splice(taskIndex, 1);
            updateScreen()
            
        } else if (target.name === 'edit') {
            // save clicked index on close btn
            editTaskClose.dataset.projectIndex = projectIndex;
            editTaskClose.dataset.taskIndex = taskIndex;
            // load details from memory
            populateInputs(projectIndex, taskIndex);
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
            updateScreen()
        } else if (name === 'cancel') {
            editTaskModal.close()
            editTaskForm.reset()
            updateScreen()
        } else {
            return
        }
    })
};