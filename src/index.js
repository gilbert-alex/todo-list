import './style.css';

import Project from './modules/project'
import Todo from './modules/todo'
import {listProjects, addToContainer} from './modules/screen-controller'

const projects = [];

const birdhouse = new Project('birdhouse');
const laundry = new Project('laundry');
projects.push(birdhouse);
projects.push(laundry);

const measure = new Todo(
    'measure wood',
    'measure twice cut once',
    'tomorrow',
    'high',
);

const cutWood = new Todo(
    'cut wood to measurement',
    'be sure you measured twice',
    'tomorrow',
    'medium',
)

birdhouse.addTask(measure);
birdhouse.addTask(cutWood);

// listProjects(document.getElementById('content'), birdhouse.taskTitles());

console.log(birdhouse.taskDetails());

projects.map( project => {
    addToContainer( document.getElementById('sidebar'), project.name);
})

