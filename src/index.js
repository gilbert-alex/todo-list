import './style.css';

// new branch


import {initListeners} from './modules/screen-controller'
import demo from './demo'

demo();

import {updateScreen} from './modules/dom-util'
const content = document.querySelector('#content');
const sidebar = document.querySelector('#project-sidebar')

updateScreen(projectList, content, sidebar)