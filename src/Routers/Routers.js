import React from 'react'
import { Route, Routes } from 'react-router-dom';
import WriteNew from '../components/WriteNew';
import Home from '../pages/Home';
import ShowPrev from '../pages/ShowPrev';
import TaskAssign from '../pages/TaskAssign';
import TaskManager from '../pages/Task2';
import ProjectAssign from '../pages/Project';

const Routers = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" exact element={<WriteNew />} />
            <Route path="/preview" exact element={<ShowPrev />} />
            <Route path="/task" exact element={<TaskAssign />} />
            <Route path="/project" exact element={<ProjectAssign />} />
        </Routes>
    )
}

export default Routers