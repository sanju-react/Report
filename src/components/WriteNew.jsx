import React, { useState } from "react";
import EmailForm from "../layout/EmailForm.js";
// import { FormDataSend } from "./FormDataSend";
import ReactToPrint from "react-to-print";
import { PDFViewer } from "@react-pdf/renderer";
import PrintDocument from "./PrintDocument.js";

const WriteNew = () => {
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
  return (
    <div className="w-3/4 flex">
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
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg text-white "
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-printer-fill "
              viewBox="0 0 16 16"
            >
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
            </svg>
          )}
        </button>

        {/* <PrintDocument/> */}
      </div>
      <div className="w-1/2 p-8 flex flex-col">
        {/* <p>Date:- <span className='mx-2'>{new Date().getDate()}-{new Date().getMonth() + 1}-{new Date().getFullYear()}</span></p> */}
        {/* <FormDataSend data={[completeTask, pendingTask]} /> */}
        {isModalOpen && (
          <EmailForm
            data={[completeTask, pendingTask]}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        <h5 className="text-left font-bold my-4 underline">
          Completed Task :-
        </h5>
        <div className="flex flex-col gap-y-4">
          {completeTask.map((ct, i) => (
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
        <h5 className="text-left font-bold my-4 underline">Pending Task :- </h5>
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
              class="bi bi-envelope-plus-fill"
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
              class="bi bi-trash2"
              viewBox="0 0 16 16"
            >
              <path d="M14 3a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5s-3.69-.311-4.785-.793" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-1/2 p-10">
        {(completeTask[0].text !== "" ||
          pendingTask[0].text !== "" ||
          comment !== "") && (
          <>
            <div className="text-xl font-semibold text-left">Hi,</div>
            <div className="text-xl font-semibold text-left">
              Date: {new Date().getDate()}-{new Date().getMonth() + 1}-
              {new Date().getFullYear()}
            </div>
            <div className="text-xl font-semibold text-left my-2">
              I've completed task as below:
            </div>

            <div className="mt-3">
              {completeTask.map(
                (ct, i) =>
                  ct.text !== "" && (
                    <div className="flex" key={i}>
                      <li className="text-xl text-left decoration-list">
                        {ct.text}
                      </li>
                    </div>
                  )
              )}
            </div>
            <div className="text-xl font-semibold text-left my-2">
              Pending task as below:
            </div>

            <div className="mt-3">
              {pendingTask.map(
                (ct, i) =>
                  ct.text !== "" && (
                    <div className="flex" key={i}>
                      <li className="text-xl text-left decoration-list">
                        {ct.text}
                      </li>
                    </div>
                  )
              )}
            </div>

            <div className="text-xl font-semibold text-left my-2">
              Comment as below:
            </div>
            <div className="mt-3">
              <p className="text-xl text-left decoration-list">{comment}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WriteNew;
