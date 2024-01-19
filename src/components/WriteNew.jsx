import React, { useState, useEffect } from "react";
import EmailForm from "../layout/EmailForm.js";
// import { FormDataSend } from "./FormDataSend";
import ReactToPrint from "react-to-print";
import { PDFViewer } from "@react-pdf/renderer";
import PrintDocument from "./PrintDocument.js";
import msg from "../utils/greeting.js";

const WriteNew = () => {
  var completeText = "";
  var pendingText = "";
  const [completeTask, setCompleteTask] = useState([
    { id: 1, text: "", photo: "" },
    { id: 2, text: "", photo: "" },
    { id: 3, text: "", photo: "" },
  ]);
  const [pendingTask, setPendingTask] = useState([
    { id: 1, text: "", photo: "" },
    { id: 2, text: "", photo: "" },
    { id: 3, text: "", photo: "" },
  ]);
  const [errorText, setErrorText] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const [dragEle, setDragEle] = useState(null);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrint, setIsPrint] = useState(false);

  const blur = (i, arr, arrFunc) => {
    let obj = [...arr];
    delete obj[i].focus;
    arrFunc(obj);
  };

  const focus = (i, arr, arrFunc) => {
    let obj = [...arr];
    obj[i]["focus"] = true;
    arrFunc(obj);
  };

  const setCompletedTask = (
    e,
    i = undefined,
    arr = undefined,
    arrFunc = undefined
  ) => {
    errorText !== "" && setErrorText("");
    let obj = [...arr];
    obj[i].text = e.target.value;
    arrFunc(obj);
  };

  const setPhoto = (e, i, arr, arrFunc) => {
    let obj = [...arr];
    obj[i].photo = e.target.value;
    arrFunc(obj);
  };
  const removeInput = (i, arr, arrFunc) => {
    let obj = [...arr];
    obj.splice(i, 1);
    arrFunc(obj);
  };
  const addInput = (i, arr, arrFunc) => {
    let obj = [...arr];
    obj.push({ id: obj.length, text: "", photo: "" });
    // obj[length]['text'] = ""
    arrFunc(obj);
  };

  const ctHandleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
    setCompleteTask((prevDivs) =>
      prevDivs.map((div) =>
        div.id === id ? { ...div, isDragging: true } : div
      )
    );
  };

  const ctHandleDragOver = (event) => {
    event.preventDefault();
  };

  const ctHandleDrop = (event, targetId) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain");
    setCompleteTask((prevDivs) => {
      const updatedDivs = prevDivs.map((div) =>
        div.id === parseInt(sourceId)
          ? { ...div, isDragging: true }
          : div.id === targetId
          ? { ...div, isDragging: true }
          : div
      );
      // Reorder the divs array according to the dropped div
      const sourceIndex = updatedDivs.findIndex(
        (div) => div.id === parseInt(sourceId)
      );
      const targetIndex = updatedDivs.findIndex((div) => div.id === targetId);
      const [draggedDiv] = updatedDivs.splice(sourceIndex, 1);
      updatedDivs.splice(targetIndex, 0, draggedDiv);
      return updatedDivs;
    });
  };

  const ptHandleDragStart = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
    setPendingTask((prevDivs) =>
      prevDivs.map((div) =>
        div.id === id ? { ...div, isDragging: true } : div
      )
    );
  };

  const ptHandleDragOver = (event) => {
    event.preventDefault();
  };

  const ptHandleDrop = (event, targetId) => {
    // event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain");
    setPendingTask((prevDivs) => {
      const updatedDivs = prevDivs.map((div) =>
        div.id === parseInt(sourceId)
          ? { ...div, isDragging: true }
          : div.id === targetId
          ? { ...div, isDragging: true }
          : div
      );
      // Reorder the divs array according to the dropped div
      const sourceIndex = updatedDivs.findIndex(
        (div) => div.id === parseInt(sourceId)
      );
      const targetIndex = updatedDivs.findIndex((div) => div.id === targetId);
      const [draggedDiv] = updatedDivs.splice(sourceIndex, 1);
      updatedDivs.splice(targetIndex, 0, draggedDiv);
      return updatedDivs;
    });
  };

  const getCurrentDate = () => {
    var currentDate = new Date();
    var updatedDate =
      currentDate.getDate() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear();

    return updatedDate;
  };

  const resetForm = () => {
    setCompleteTask([
      { id: 1, text: "", photo: "" },
      { id: 2, text: "", photo: "" },
      { id: 3, text: "", photo: "" },
    ]);
    setPendingTask([
      { id: 1, text: "", photo: "" },
      { id: 2, text: "", photo: "" },
      { id: 3, text: "", photo: "" },
    ]);
    setErrorText("");
    setDragIndex(null);
    setDragEle(null);
    setComment("");
    setIsModalOpen(false);
  };

  const getCompletedTask = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
      let completedTaskArray = tasks
        .map((val) =>
          val["tasks"].map(
            (val) => val["lastUpdated"] == getCurrentDate() && val["title"]
          )
        )
        .flat();
      let cArray = [];
      // console.log(completedTaskArray);
      completedTaskArray.map((val, i) => {
        if (!!val) {
          cArray.push({ id: i + 1, text: val, photo: "" });
        }
      });
      setCompleteTask(cArray);

      // for pending task
      let pendingTaskArray = tasks
        .map((val) =>
          val["tasks"].map(
            (val) => val["lastUpdated"] !== getCurrentDate() && val["title"]
          )
        )
        .flat();
      // console.log(pendingTaskArray);
      let pArray = [];
      pendingTaskArray.map((val, i) => {
        if (!!val) {
          pArray.push({ id: i + 1, text: val, photo: "" });
        }
      });
      setPendingTask(pArray);
      // console.log("Complete Task:"+cArray);
      // console.log("Pending Task:"+pArray);
    } else {
      alert("No Tasks Available!");
    }
  };

  return (
    <div className="h-full w-full md:flex gap-10 p-8 ">
      <div>
        {isPrint && (
          <PDFViewer style={{ width: "100vw", height: "100vh" }}>
            <PrintDocument
              completeTask={completeTask}
              pendingTask={pendingTask}
              comment={comment}
            />
          </PDFViewer>
        )}

        <button
          onClick={() => setIsPrint(!isPrint)}
          className="fixed bottom-5 right-5"
        >
          {isPrint ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-lg text-white "
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-printer-fill hover:scale-125 "
              viewBox="0 0 16 16"
            >
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
            </svg>
          )}
        </button>

        {/* <PrintDocument/> */}
      </div>
      <div className=" md:w-1/2 w-full flex flex-col mb-5">
        {/* <p>Date:- <span className='mx-2'>{new Date().getDate()}-{new Date().getMonth() + 1}-{new Date().getFullYear()}</span></p> */}
        {/* <FormDataSend data={[completeTask, pendingTask]} /> */}
        {isModalOpen && (
          <EmailForm
            data={[completeTask, pendingTask]}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        <h5 className="text-left font-bold my-4  flex justify-between items-center">
          <span className="underline">Completed Task :-</span>{" "}
          <button
            onClick={getCompletedTask}
            className="text-green-500 pr-5 hover:text-red-500"
            title="Get Completed Task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-database-down"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0" />
              <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4" />
            </svg>
          </button>
        </h5>
        <div className="flex flex-col gap-y-4">
          {completeTask?.map((ct, i) => (
            <div
              key={i}
              className="w-full flex items-center gap-x-2"
              //   draggable={ct.focus}
              draggable
              onDragStart={(event) => ctHandleDragStart(event, ct.id)}
              onDragOver={ctHandleDragOver}
              onDrop={(event) => ctHandleDrop(event, ct.id)}
              style={{
                // background: ct.isDragging ? "lightblue" : "white",
                cursor: ct.isDragging ? "grabbing" : "grab",
              }}
            >
              {completeTask.length > 1 && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#5e656c"
                    className="bi bi-justify"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </>
              )}
              <div className="w-full flex flex-col justify-start">
                <input
                  type="text"
                  value={ct?.text}
                  onBlur={() => blur(i, completeTask, setCompleteTask)}
                  onFocus={() => focus(i, completeTask, setCompleteTask)}
                  onChange={(e) =>
                    setCompletedTask(e, i, completeTask, setCompleteTask)
                  }
                  className="w-full border border-black p-2 rounded-lg"
                />
                {errorText !== "" && (
                  <p className="text-red-700 text-base text-left">
                    {errorText}
                  </p>
                )}
              </div>
              {/* <div className='relative w-[5%] overflow-hidden inline-block'>
              <input type="file" value={ct.photo} onChange={(e) => setPhoto(e, i)} className='opcaity-0 absolute top-0 left-0' />
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ddd" className="bi bi-plus-square-dotted w-full absolute top-0 left-0" viewBox="0 0 16 16">
                <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </div> */}
              <div>
                {completeTask.length - 1 === i ? (
                  <svg
                    onClick={() =>
                      ct.text !== ""
                        ? addInput(i, completeTask, setCompleteTask)
                        : setErrorText("Please enter some text first")
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() =>
                      removeInput(i, completeTask, setCompleteTask)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-dash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        <h5 className="text-left font-bold my-4 underline">
          <span>Pending Task :- </span>{" "}
        </h5>
        <div className="flex flex-col gap-y-4">
          {pendingTask.map((pt, i) => (
            <div
              key={i}
              className="w-full flex items-center gap-x-2"
              draggable
              onDragStart={(event) => ptHandleDragStart(event, pt.id)}
              onDragOver={ptHandleDragOver}
              onDrop={(event) => ptHandleDrop(event, pt.id)}
              style={{
                // background: pt.isDragging ? "lightblue" : "white",
                cursor: pt.isDragging ? "grabbing" : "grab",
              }}
            >
              {pendingTask.length > 1 && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#5e656c"
                    className="bi bi-justify"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </>
              )}
              <div className="w-full flex flex-col justify-start">
                <input
                  type="text"
                  value={pt?.text}
                  onBlur={() => blur(i, pendingTask, setPendingTask)}
                  onFocus={() => focus(i, pendingTask, setPendingTask)}
                  onChange={(e) =>
                    setCompletedTask(e, i, pendingTask, setPendingTask)
                  }
                  className="w-full border border-black p-2 rounded-lg"
                />
                {errorText !== "" && (
                  <p className="text-red-700 text-base text-left">
                    {errorText}
                  </p>
                )}
              </div>

              <div>
                {completeTask.length - 1 === i ? (
                  <svg
                    onClick={() =>
                      pt.text !== ""
                        ? addInput(i, pendingTask, setPendingTask)
                        : setErrorText("Please enter some text first")
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => removeInput(i, pendingTask, setPendingTask)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-dash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
        <h5 className="text-left font-bold my-4 underline">Any Comment :-</h5>
        <textarea
          className="p-2"
          style={{ border: "1px solid black", borderRadius: "10px" }}
          rows="4"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <div className="flex justify-center items-center gap-5 mt-5">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="hover:bg-blue-600 bg-blue-500 rounded-md text-white p-3 w-1/3 font-semibold flex justify-center items-center gap-3"
          >
            <span> Report</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope-plus-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
            </svg>
          </button>
          <button
            onClick={() => resetForm()}
            className="hover:bg-gray-600 bg-gray-500 rounded-md text-white p-3 w-1/3 font-semibold flex justify-center items-center gap-3"
          >
            <span> Clear</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash2"
              viewBox="0 0 16 16"
            >
              <path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
            </svg>
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full p-5 shadow-lg rounded-xl  border-2">
        <h1 className="text-center text-xl font-bold mb-5">Daily Reports</h1>
        {(completeTask[0]?.text !== "" ||
          pendingTask[0]?.text !== "" ||
          comment !== "") && (
          <>
            <div className="text-xl font-semibold text-left">Hi, {msg()}</div>
            <div className="text-xl font-semibold text-left">
              Date: {new Date().getDate()}-{new Date().getMonth() + 1}-
              {new Date().getFullYear()}
            </div>
            <div className="text-xl font-semibold text-left my-2">
              {completeTask.map((ct) => {
                if (ct.text !== "") {
                  completeText = "Complete Task :-";
                }
              })}
              {completeText}
            </div>

            <div className="mt-3 ">

            <ol className="ml-16">
            
              {completeTask.map(
                (ct, i) =>
                  ct.text !== "" && (
                      <li key={i} className="text-xl text-left decoration-none list-decimal">
                        {ct.text}
                        <span className="font-bold">{`\t [Done]`}</span>
                      </li>
                    )
                )}
              </ol>
            </div>
            <div className="text-xl font-semibold text-left my-2">
              {pendingTask.map((ct) => {
                if (ct.text !== "") {
                  pendingText = "Pending Task:-";
                }
              })}
              {pendingText}
            </div>

            <div className="mt-3">
              <ol className="ml-16">
                {pendingTask.map(
                  (ct, i) =>
                    ct.text !== "" && (
                      <div className="flex" key={i}>
                        <li className="text-xl text-left decoration-none list-decimal">
                          {ct.text}
                        </li>
                      </div>
                    )
                )}
              </ol>
            </div>

            <div className="text-xl font-semibold text-left my-2">
              {comment ? "Comment as below:" : ""}
            </div>
            <div className="mt-3">
              <p className="text-xl text-left decoration-list">{comment}</p>
            </div>
          </>
        )}
        {completeTask[0]?.text === "" &&
          pendingTask[0]?.text === "" &&
          comment === "" && (
            <span className="h-full w-full flex justify-center items-center">
              No Report!
            </span>
          )}
      </div>
    </div>
  );
};

export default WriteNew;
