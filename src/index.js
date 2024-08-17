import './style.css';

import Todo from './modules/todo'
import Project from './modules/project'
import {initListeners} from './modules/screen-controller'

export const projectList = [];
export const filteredList = [];

initListeners();

// demo

const birdhouse = new Project('Build a birdhouse')
const getReady = new Project('Get ready for day')

const measure = new Todo(
    'measure wood',
    'measure twice cut once',
    'tomorrow',
    'high',
);

const cutWood = new Todo(
    'cut wood',
    'be sure you measured twice',
    'tomorrow',
    'medium',
)

const shower = new Todo(
    'shower',
    'can\'t smell bad',
    'morning',
    'high',
)

birdhouse.addTask(measure);
birdhouse.addTask(cutWood);
getReady.addTask(shower);


import {updateScreen} from './modules/dom-util'
const content = document.querySelector('#content');
const sidebar = document.querySelector('#project-sidebar')

updateScreen(projectList, content, sidebar)