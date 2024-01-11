import React from "react";
import { sendEmail } from "../components/EmailSend";

const EmailForm = ({ data, setIsModalOpen }) => {
  const [completeTask, pendingTask] = data;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const emailData = {
      to_name: formData.get("to_name"),
      reply_to: formData.get("reply_to"),
      subject: "Project Updates",
      message: `Date: ${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}\nComplete Task:\n${formatTasks(
        completeTask
      )}\n\nPending Task:\n${formatTasks(pendingTask)}`,
    };
    sendEmail(emailData);
    setIsModalOpen(false);
  };

  // Convert array of task objects to a plain text string
  const formatTasks = (tasks) => {
    return tasks
      .filter((task) => task.text !== "")
      .map((task) => `- ${task.text}`)
      .join("\n");
  };
  return (
    <>
      <div className="z-40 fixed  h-screen w-screen blur-3xl"></div>
      <div className="z-50 fixed h-screen w-screen  ">
        <form
          className=" w-1/3 mx-auto mt-20 p-6 bg-gray-200 border rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Daily Report Form</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="to_name"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="text"
              name="reply_to"
              required
              placeholder="Enter your Email"
            />
          </div>
          <div className="flex gap-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="reset"
              onClick={() => setIsModalOpen(false)}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailForm;
