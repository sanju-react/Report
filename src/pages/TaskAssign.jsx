import { Modal, Tooltip, notification } from "antd";
import React, { useEffect, useState } from "react";

const TaskAssign = () => {
  const [assignTask, setAssignTask] = useState({});
  const [taskArr, setTaskArr] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [error, setError] = useState("");
  const [index, setIndex] = useState();
  const [addProjectModal, setAddProjectModel] = useState(false);
  const [assignProject, setAssignProject] = useState({});
  const [activeTask, setActiveTask] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, description) => {
    api[type]({
      message: type,
      description,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("tasks") !== null) {
      setTaskArr(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  const addRow = () => {
    // let task = JSON.parse(localStorage.getItem('tasks') || '[]')
    let task = [...taskArr];
    let obj = { ...assignTask },
      taskPushed = false;

    obj["date"] = new Date().toLocaleDateString();
    obj["id"] = new Date().getTime();
    obj["timer"] = "start";
    obj["time"] = "00:00:00";

    let projectAvailable = task.filter((t) => t.project === obj.project);
    if (projectAvailable.length > 0) {
      let isTaskAvail = task
        .filter((t) => t.project === obj.project)[0]
        .tasks.filter((t) => t.title === obj.title && t.timer !== "Stopped");
      if (isTaskAvail.length > 0) {
        openNotificationWithIcon(
          "error",
          `You cannot add duplicate task in ${obj.project}`
        );
        taskPushed = false;
      } else {
        task.filter((t) => t.project === obj.project)[0].tasks.push(obj);
        taskPushed = true;
      }
    } else {
      let proj = {};
      proj["project"] = obj.project;
      proj["tasks"] = [];
      proj["tasks"].push(obj);
      task.unshift(proj);
      taskPushed = true;
    }
    // task.push(obj);
    if (taskPushed) {
      setTaskArr(task);
      localStorage.setItem("tasks", JSON.stringify(task));
      showModal("");

      setAssignTask({});
    }
  };
  const editRow = () => {
    let task = [...taskArr];
    task[index] = assignTask;
    setTaskArr(task);
    localStorage.setItem("tasks", JSON.stringify(task));
    setAssignTask({});
  };

  const enterTaskDetails = ({ target }) => {
    let obj = { ...assignTask };
    obj[target.name] = target.value;
    setAssignTask(obj);
  };
  const showModal = (bool) => {
    setAssignTask({});
    setAddTask(bool);
    setAddProjectModel(false);
    setAssignProject({});
  };
  const handleOk = () => {
    addRow();
    // console.log("submit");
  };
  const handleCancel = () => {
    console.log("cancel");
    showModal("");
  };

  const changePriority = (i, { target }) => {
    let task = [...taskArr];
    task[i]["priority"] = target.value;
    setTaskArr(task);
    localStorage.setItem("tasks", JSON.stringify(task));
  };

  const startTimer = (i, val, projI) => {
    let tasks = [...taskArr];
    if (JSON.stringify(tasks).includes("stop") === false) {
      tasks[projI]["tasks"][i]["timer"] = val;
      setActiveTask({
        id: tasks[projI]["tasks"][i]["id"],
        isRunning: true,
        project: tasks[projI].project,
      });

      setTaskArr(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      openNotificationWithIcon(
        "warning",
        "You cannot start timer when one task's time on process"
      );
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (activeTask !== null && activeTask.isRunning) {
        let projIndex = taskArr.findIndex(
          (v) => v.project === activeTask.project
        );
        let taskIndex = taskArr[projIndex].tasks.findIndex(
          (v) => v.id === activeTask.id
        );
        const updatedTasks = [...taskArr];
        const [hours, minutes, seconds] = updatedTasks[projIndex].tasks[
          taskIndex
        ]?.time
          ?.split(":")
          .map(Number);
        let h, m, s;
        h = minutes === 59 ? hours + 1 : hours;
        m = seconds === 59 ? minutes + 1 : minutes;
        s = seconds === 59 ? -1 : seconds;
        updatedTasks[projIndex].tasks[taskIndex].time = `${h
          .toString()
          .padStart(2, "0")}:${m.toString().padStart(2, "0")}:${(s + 1)
          .toString()
          .padStart(2, "0")}`;
        setTaskArr(updatedTasks);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activeTask, taskArr]);

  const pauseTimer = (i, val, projI) => {
    let task = [...taskArr];
    task[projI]["tasks"][i]["timer"] = val;
    setTaskArr(task);
    localStorage.setItem("tasks", JSON.stringify(task));
    setActiveTask({ ...activeTask, isRunning: false });
  };

  const stopTimer = (i, val, projI) => {
    let task = [...taskArr];
    task[projI]["tasks"][i]["timer"] = val;

    setTaskArr(task);
    localStorage.setItem("tasks", JSON.stringify(task));
    let taskIndex;
    task.forEach((task) => {
      taskIndex = task.tasks.findIndex((v) => v.id === activeTask.id);
    });
    const updatedTasks = [...task];
    // updatedTasks[taskIndex].isRunning = false;
    setTaskArr(updatedTasks);
    setActiveTask(null);
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

  const addProject = () => {
    let project = JSON.parse(localStorage.getItem("projects"));
    let obj = { ...assignProject };
    let task = [...taskArr];
    if (project.findIndex((p) => p.title === obj.title) === -1) {
      obj["date"] = new Date().toLocaleDateString();
      obj["id"] = new Date().getTime();
      obj["assignedProject"] = 0;
      obj["time"] = "00:00:00";

      project.push(obj);
      let proj = {};
      proj["project"] = obj.title;
      proj["tasks"] = [];
      task.unshift(proj);
      setTaskArr(task);

      localStorage.setItem("projects", JSON.stringify(project));
      localStorage.setItem("tasks", JSON.stringify(task));

      let objs = { ...assignTask };
      objs["project"] = assignProject.title;
      setAssignTask(obj);
      setAssignProject({});
      setAddProjectModel(false);
      setError("");
    } else {
      setError("project already exist");
    }
  };

  const enterProjectDetails = ({ target }) => {
    let obj = { ...assignProject };
    obj[target.name] = target.value;
    setAssignProject(obj);
  };

  return (
    <>
      {contextHolder}
      <button
        className="flex gap-x-4 my-2 items-center bg-gray-300 rounded mx-4 w-auto py-2 px-4"
        onClick={() => showModal("add")}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="Green"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </span>{" "}
        Add Task
      </button>
      <div className="w-full flex flex-col justify-center items-center">
        {taskArr
          .filter((ts) => ts.project !== "")
          .map((ts, ind) => (
            <div
              className="h-[300px] w-[90%] my-4 p-3 overflow-y-scroll"
              style={{ boxShadow: "0px 0px 9px 4px rgb(0 0 0 / 0.25)" }}
            >
              <h2 className="text-left font-bold underline underline-offset-2">
                Project:- {ts.project}
              </h2>
              <table className="w-full my-5">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="py-5">Assign Date</th>
                    <th className="py-5">Task</th>
                    <th className="py-5">Priority</th>
                    <th className="py-5">Status</th>
                    <th className="py-5">Total Time</th>
                    <th className="flex gap-x-3 items-center py-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ts.tasks
                    .filter((v) => v.title !== "")
                    .map((v, i) => (
                      <tr key={i}>
                        <td>{v.date}</td>
                        <td>{v.title}</td>
                        <td>
                          <select
                            name="priority"
                            onChange={(e) => changePriority(i, e)}
                            value={!!v.priority ? v.priority : "Not Selected"}
                            className="py-3 border-b-2 border-gray-500"
                          >
                            <option value="Not Selected">--Priority--</option>
                            <option name="High">High</option>
                            <option name="Medium">Medium</option>
                            <option name="Low">Low</option>
                          </select>
                        </td>
                        <td className="py-3">
                          <>
                            {v.timer === "start" ? (
                              <button
                                onClick={() => startTimer(i, "stop", ind)}
                                className={"bg-green-500 px-2 py-0 rounded"}
                              >
                                Start
                              </button>
                            ) : v.timer === "stop" ? (
                              <div className="flex gap-x-5 justify-center">
                                <button
                                  onClick={() => pauseTimer(i, "paused", ind)}
                                  className={
                                    "bg-green-700 px-2 text-white py-0 rounded"
                                  }
                                >
                                  Pause
                                </button>
                                <button
                                  onClick={() => stopTimer(i, "Stopped", ind)}
                                  className={
                                    "bg-red-500 px-2 text-white py-0 rounded"
                                  }
                                >
                                  {v.timer}
                                </button>
                              </div>
                            ) : v.timer === "paused" ? (
                              <div className="flex gap-x-5 justify-center">
                                <button
                                  onClick={() => startTimer(i, "stop", ind)}
                                  className={
                                    "bg-green-700 px-2 text-white py-0 rounded"
                                  }
                                >
                                  start
                                </button>
                                <button
                                  onClick={() => stopTimer(i, "Stopped", ind)}
                                  className={
                                    "bg-red-500 px-2 text-white py-0 rounded"
                                  }
                                >
                                  stop
                                </button>
                              </div>
                            ) : (
                              v.timer === "Stopped" && (
                                <h1
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Would you want to resume your project?"
                                      )
                                    ) {
                                      startTimer(i, "stop", ind);
                                    }
                                  }}
                                  className="text-red-700 font-semibold cursor-pointer"
                                >
                                  STOPPED
                                </h1>
                              )
                            )}
                          </>
                        </td>
                        <td className="flex justify-center items-center h-full">
                          <div className="flex gap-x-5 items-center">
                            {v.time}
                            <Tooltip
                              placement="right"
                              title={
                                v.timer === "stop"
                                  ? "timer started"
                                  : v.timer === "paused"
                                  ? "paused"
                                  : v.timer === "stopped"
                                  ? "task done"
                                  : "not started yet"
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#ddd"
                                className="bi bi-info-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                              </svg>
                            </Tooltip>
                          </div>
                        </td>
                        <td>{/* <a href="#">Show Details</a> */}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
      <Modal
        footer={null}
        title={"Add Task"}
        open={!!addTask}
        onHide={() => showModal("")}
        onCancel={handleCancel}
        cancelButtonProps={{ classNames: "bg-red-700 text-white py-2 px-4" }}
      >
        <div className="flex flex-col my-4">
          <input
            placeholder="Task Title"
            value={assignTask.title || ""}
            name="title"
            onChange={(e) => enterTaskDetails(e)}
            className="border border-gray-300 my-3 p-1"
            required
          />
          <input
            placeholder="Task Description (if any)"
            value={assignTask.desc || ""}
            name="desc"
            onChange={(e) => enterTaskDetails(e)}
            className="border border-gray-300 my-3 p-1"
          />
          <div className="w-full flex items-center gap-x-4 my-4">
            <h3>Project: </h3>
            {/* <div>
                            
                        </div> */}
            <select
              onFocus={() => setAddProjectModel(false)}
              name="project"
              onChange={(e) => enterTaskDetails(e)}
              placeholder="--Select Project--"
              className="bg-gray-300 py-3 border-b-2 border-gray-500 w-40"
              required
            >
              <option>--Select Project--</option>
              {JSON.parse(localStorage.getItem("projects") || "[]").map(
                (opt, i) => (
                  <option name={opt.title}>{opt.title}</option>
                )
              )}
            </select>
            <div>
              {addProjectModal ? (
                <div className="flex gap-x-2">
                  <div>
                    <input
                      placeholder="Project Name"
                      value={assignProject.title || ""}
                      name="title"
                      onChange={(e) => enterProjectDetails(e)}
                      className="border border-gray-300 mt-1 p-1 w-full"
                      required
                    />
                    <p className="text-red-600">{error}</p>
                  </div>
                  <button
                    className="bg-green-900 text-white px-4"
                    onClick={addProject}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <h4>
                  Your Project is not listed here? Click{" "}
                  <span
                    className="text-blue-700"
                    onClick={() => {
                      setAddProjectModel(true);
                      setAssignProject({});
                    }}
                  >
                    Here!
                  </span>{" "}
                  to add new one
                </h4>
              )}
            </div>
          </div>
          <div className="w-full flex items-center gap-x-4 my-4">
            <h3>Priority: </h3>
            <select
              name="priority"
              onChange={(e) => enterTaskDetails(e)}
              placeholder="--Select Priority--"
              className="bg-gray-300 py-3 border-b-2 border-gray-500"
            >
              <option></option>
              <option name="High">High</option>
              <option name="Medium">Medium</option>
              <option name="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="bg-green-900 text-white py-2 px-4"
            onClick={handleOk}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TaskAssign;
