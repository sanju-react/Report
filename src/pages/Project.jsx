import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const ProjectAssign = () => {
  const [assignProject, setAssignProject] = useState({});
  const [projectArr, setProjectArr] = useState([]);
  const [taskArr, setTaskArr] = useState([]);
  const [addProject, setAddProject] = useState("");
  const [index, setIndex] = useState();

  useEffect(() => {
    if (localStorage.getItem("projects") !== null) {
      setProjectArr(JSON.parse(localStorage.getItem("projects")));
    }
    if (localStorage.getItem("tasks") !== null) {
      setTaskArr(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  const getTasksCount = (project_name) => {
    const count = taskArr.map(
      (val) => val.project === project_name && val.tasks.length
    );
    return count;
  };

  const addRow = () => {
    // let project = JSON.parse(localStorage.getItem('projects') || '[]')
    let project = [...projectArr];
    let obj = { ...assignProject };
    obj["date"] = new Date().toLocaleDateString();
    obj["id"] = new Date().getTime();
    obj["assignedProject"] = 0;
    obj["time"] = "00:00:00";
    obj["status"] = "inactive";
    project.push(obj);
    project.shift();
    setProjectArr(project);
    localStorage.setItem("projects", JSON.stringify(project));
    setAssignProject({});
  };
  const editRow = () => {
    let project = [...projectArr];
    project[index] = assignProject;
    setProjectArr(project);
    localStorage.setItem("projects", JSON.stringify(project));
    setAssignProject({});
  };

  const enterProjectDetails = ({ target }) => {
    let obj = { ...assignProject };
    obj[target.name] = target.value;
    setAssignProject(obj);
  };
  const showModal = (bool) => {
    let project = [...projectArr];
    if (bool) {
      project.unshift({});
    } else {
      project.shift();
    }
    setProjectArr(project);
    setAssignProject({});
    setAddProject(bool);
  };
  const handleOk = () => {
    addRow();
    // showModal("");
    // console.log("submit");
  };
  const handleCancel = () => {
    console.log("cancel");
    showModal("");
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener("beforeunload", onBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  const onBeforeUnload = () => {
    // Your cleanup or warning logic here
    alert("Do you really want to leave this page?");
  };

  return (
    <>
      {/* {contextHolder} */}
      <button
        className="fixed bottom-5 right-3  bg-transparent rounded mx-4 w-auto "
        onClick={() => showModal(true)}
        title="Add Project"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="bi bi-plus-circle-fill fill-blue-500"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </button>
      <Modal
        footer={null}
        title={"Add Project"}
        open={!!addProject}
        onHide={() => showModal("")}
        onCancel={handleCancel}
        cancelButtonProps={{ classNames: "bg-red-700 text-white py-2 px-4" }}
      >
        <div className="flex flex-col my-4">
          <input
            placeholder="Project Name"
            value={assignProject.title || ""}
            name="title"
            onChange={(e) => enterProjectDetails(e)}
            className="border border-gray-300 my-3 p-1"
            required
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 rounded-md text-white py-2 px-4"
            onClick={handleOk}
          >
            Submit
          </button>
        </div>
      </Modal>

      <div className="h-screen  overflow-scroll    px-10">
        <table className="min-w-full   divide-gray-200  ">
          <thead>
            <tr className="">
              <th className="px-6 text-center py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 text-center py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 text-center py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasks
              </th>
              <th className="px-6 text-center py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 text-center py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 text-center py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projectArr?.map((val, i) => {
              return (
                <tr key={i}>
                  <td className="px-6 text-center  py-4 ">{val.id}</td>
                  <td className="px-6 text-center py-4 whitespace-nowrap">
                    {val.title}
                  </td>
                  <td className="px-6 text-center py-4 whitespace-nowrap">
                    {getTasksCount(val.title) && getTasksCount(val.title)}
                  </td>
                  <td className="px-6 text-center py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        val.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {val.status}
                    </span>
                  </td>
                  <td className="px-6 text-center py-4 whitespace-nowrap">
                    {val.time}
                  </td>
                  <td className="px-6 text-center py-4 whitespace-nowrap">
                    <button className="hover:scale-125 p-2 font-medium  text-blue-600 rounded-md hover:text-blue-500 focus:outline-none focus:shadow-outline-blue active:text-blue-600 transition duration-150 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </button>
                    <button className="ml-2 hover:scale-125   py-2 font-medium  text-red-600 rounded-md hover:text-red-500 focus:outline-none focus:shadow-outline-red active:text-red-600 transition duration-150 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectAssign;
