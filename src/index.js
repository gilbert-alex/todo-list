import './style.css';

import {initContentListener, initNavBtns} from './modules/screen-controller'


export const projectList = [];
export const filterList = [];

initNavBtns();
initContentListener();


// demo
import demo from './demo'
import {updateScreen} from './modules/dom-util'
const content = document.querySelector('#content');
const sidebar = document.querySelector('#project-sidebar')
demo();
updateScreen(projectList, content, sidebar, filterList)