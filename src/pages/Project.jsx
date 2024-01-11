import { Modal } from 'antd'
import React, { useEffect, useState } from 'react';

const ProjectAssign = () => {
    const [assignProject, setAssignProject] = useState({})
    const [projectArr, setProjectArr] = useState([])
    const [addProject, setAddProject] = useState('');
    const [index, setIndex] = useState();


    useEffect(() => {
        if (localStorage.getItem('projects') !== null) {
            setProjectArr(JSON.parse(localStorage.getItem('projects')))
        }
    }, [])


    const addRow = () => {
        // let project = JSON.parse(localStorage.getItem('projects') || '[]')
        let project = [...projectArr]
        let obj = { ...assignProject }
        obj['date'] = new Date().toLocaleDateString();
        obj['id'] = new Date().getTime()
        obj['assignedProject'] = 0
        obj['time'] = '00:00:00'
        project.push(obj);
        project.shift()
        setProjectArr(project)
        localStorage.setItem('projects', JSON.stringify(project))
        setAssignProject({})

    }
    const editRow = () => {
        let project = [...projectArr]
        project[index] = assignProject;
        setProjectArr(project);
        localStorage.setItem('projects', JSON.stringify(project))
        setAssignProject({})
    }

    const enterProjectDetails = ({ target }) => {
        let obj = { ...assignProject }
        obj[target.name] = target.value;
        setAssignProject(obj)
    }
    const showModal = (bool) => {
        let project = [...projectArr]
        if (bool) {
            project.unshift({})
        } else {
            project.shift()
        }
        setProjectArr(project);
        setAssignProject({})
        // setAddProject(bool)
    }
    const handleOk = () => {
        addRow()
        // console.log("submit");

    };
    const handleCancel = () => {
        console.log("cancel");
        showModal('')
    };

    useEffect(() => {
        // Add the event listener when the component mounts
        window.addEventListener('beforeunload', onBeforeUnload);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
        };
    }, []);

    const onBeforeUnload = () => {
        // Your cleanup or warning logic here
        alert('Do you really want to leave this page?');
    };

    return (
        <>
            {/* {contextHolder} */}
            <button className='flex gap-x-4 my-2 items-center bg-gray-300 rounded mx-4 w-auto py-2 px-4' onClick={() => showModal(true)}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="Green" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                </span> Add Project
            </button>
            <div className='w-full flex flex-col justify-center'>

                <table className='w-[90%] my-5'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th className='py-5'>Id</th>
                            <th className='py-5'>Project Name</th>
                            <th className='py-5'>Number of tasks</th>
                            <th className='py-5'>Status</th>
                            <th className='py-5'>Total Time Spent</th>
                            <th className='flex gap-x-3 items-center py-5'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectArr.filter((v) => v.title !== '').map((v, i) => (
                            v.title ?
                                <tr key={i}>
                                    <td>{v.id}</td>
                                    <td>{v.title}</td>
                                    <td>{v.assignedProject}</td>
                                    <td className='py-3'>{v.status}</td>
                                    <td className='flex justify-center items-center h-full'>{v.time}</td>
                                    <td>
                                        {/* <a href="#">Show Details</a> */}
                                    </td>
                                </tr>
                                : <tr>
                                    <td></td>
                                    <td colSpan={2}><input placeholder='Project Name' value={assignProject.title || ''} name="title" onChange={(e) => enterProjectDetails(e)} className='border border-gray-300 my-3 p-1 w-full' required /></td>
                                    <td><button className='bg-green-900 text-white py-2 px-4' onClick={handleOk}>Submit</button></td>
                                    <td>
                                        <h1 onClick={() => showModal(false)} className='flex justify-end'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                            </svg>
                                        </h1>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <Modal
                footer={null}
                title={"Add Project"}
                open={!!addProject}
                onHide={() => showModal('')}
                onCancel={handleCancel}
                cancelButtonProps={{ classNames: 'bg-red-700 text-white py-2 px-4' }}

            >
                <div className="flex flex-col my-4">
                    <input placeholder='Project Name' value={assignProject.title || ''} name="title" onChange={(e) => enterProjectDetails(e)} className='border border-gray-300 my-3 p-1' required />
                </div>
                <div className='w-full flex justify-end'>
                    <button className='bg-green-900 text-white py-2 px-4' onClick={handleOk}>Submit</button>
                </div>
            </Modal> */}
        </>
    )
}

export default ProjectAssign