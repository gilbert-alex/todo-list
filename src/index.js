import './style.css';

import Todo from './modules/todo'
import Project from './modules/project'
import {fillNavigation, fillContent} from './modules/screen-controller'
import {init} from './modules/screen-controller'

init();

const projects = [];

const birdhouse = new Project('Build a birdhouse')
projects.push(birdhouse);

const getReady = new Project('Get ready for day')
projects.push(getReady);

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

// DOM functions
fillNavigation(projects);
fillContent(projects);


console.log(birdhouse.toJSON());


