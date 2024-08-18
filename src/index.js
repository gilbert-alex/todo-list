import './style.css';
import '@mdi/font/css/materialdesignicons.min.css';
import './modules/screen-controller'

export const projectList = []
export const filterList = []

// demo
import demo from './modules/demo'
import {updateScreen} from './modules/dom-util'
const content = document.querySelector('#content');
const sidebar = document.querySelector('#project-sidebar')
demo()
updateScreen(projectList, content, sidebar, filterList)

