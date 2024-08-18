// demo

import Todo from './todo'
import Project from './project'


export default function demo() {
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
}

