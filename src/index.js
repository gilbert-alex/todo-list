import './style.css';

import {initListeners} from './modules/screen-controller'
import demo from './demo'

export const projectList = [];
export const filteredList = [];

initListeners();

demo();





import {updateScreen} from './modules/dom-util'
const content = document.querySelector('#content');
const sidebar = document.querySelector('#project-sidebar')

updateScreen(projectList, content, sidebar)