// DOM utilities

// multi purpose util to insert item from memory to a dom element
export function addToContainer(container, item, index, element = 'div') {
    const newElement = document.createElement(element);
    newElement.textContent = item;
    newElement.dataset.index = index;
    container.appendChild(newElement);
}

// specific dom creation func for project title in the #content
export function createProjectHeader(title, index) {

    const newHeader = document.createElement('div');
    newHeader.classList.add('header');

    const newTitle = document.createElement('h3');
    newTitle.textContent = title;

    const addBtn = document.createElement('button');
    addBtn.textContent = addBtn.name = 'add';
    addBtn.dataset.projectIndex = index;

    const delBtn = document.createElement('button');
    delBtn.textContent = delBtn.name = 'delete';
    delBtn.dataset.projectIndex = index;

    newHeader.appendChild(newTitle);
    newHeader.appendChild(addBtn);
    newHeader.appendChild(delBtn);
    console.log('new header made');
    return newHeader
}

// specific dom creation func for task title in #content
export function createProjectTasks(project, projectIndex) {

    // init container
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('tasks');
    
    // access the tasks array of Todo objects
    project.toObject().tasks.map((task, taskIndex) => {

        // add task titles to p element
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

    return dataDiv
}

export function updateScreen(memory, content, sidebar, include = null) {

    // if null include all projects from memory
    if (include === null) {
        include = [...memory.map((_,i) => i)]
    }
    
    const populateSidebar = () => {

        // empty existing dom for refresh
        while (sidebar.firstChild) {
            sidebar.removeChild(sidebar.lastChild);
        }

        // load from memory
        memory.map((project, index) => {
            addToContainer(sidebar, project.name, index, 'button');
        })
    }

    const populateContent = () => {

        // empty existing dom for refresh
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }

        // load from memory
        memory.map((project, projectIndex)=> {
            if (include.length === 0 ||
                include.includes(String(projectIndex))
            ) {
                // init container
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');

                // create header for each project
                projectDiv.appendChild(createProjectHeader(
                    project.toObject().name, 
                    projectIndex
                ));

                // project data
                projectDiv.appendChild(createProjectTasks(
                    project,
                    projectIndex
                ));

                content.appendChild(projectDiv); 
            }
        });
    }

    populateSidebar();
    populateContent();
}

// populate modal input values from memory
export function populateInputs(memory, index, subIndex, domElement) {
    const targetProject = memory[index];
    const targetTask = targetProject.toObject().tasks[subIndex];
    domElement.forEach( input => {
        input.value = targetTask[input.name] || '';
    })
}

// export function newTodoFromModal(inputs, )