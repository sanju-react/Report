import React, { useState } from "react";
import Form from "./Form";
import img from "../resourse/img.jpg";

const forms = [
  {
    names: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter Email",
    required: true,
    value: "email@gmail.com",
    validation: /\S+@\S+\.\S+/,
    validationMessage: "Please Enter Valid email",
  },
  {
    names: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    required: true,
    value: "",
    validation:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    validationMessage:
      "Please enter atleast one uppercase, one lowercase, one number, one special character and length should be 8 or more",
  },
];
const Home = () => {
  const [age, setAge] = useState();
  const setInput = ({ target }) => {
    setAge(target.value.replace(/[^0-9]/g, ""));
  };
  return (
    <div
      className="bg-blue-500 bg-cover bg-center h-screen flex justify-center items-center "
      style={{
        backgroundImage: `url(${img})`,
        backdropFilter: `blur(8px)`
      }}
    >
      <section>
        <div className="items-center px-8 py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24">
          <div className="justify-center w-full text-center lg:p-10 max-auto">
            <div className="justify-center w-full mx-auto">
              <p className="mt-8 text-5xl font-medium tracking-tighter text-black">
                TDP Reports
              </p>
              <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight text-gray-600">
              "Your Projects, Our Passion - TDP Excellence."
              </p>
            </div>
            <div className="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto mt-10 lg:flex-row">
              <a
                href="#_"
                className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
              >
                Let's Start
              </a>
              <a
                href="#_"
                className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
              >
                Learn more &nbsp; →
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <a className="p-1 -m-1 group" aria-label="Follow on Twitter" href="#_">
              <ion-icon
                className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-twitter"
                role="img"
                aria-label="logo twitter"
              ></ion-icon>
            </a>
            <a
              className="p-1 -m-1 group"
              aria-label="Follow on Instagram"
              href="#_"
            >
              <ion-icon
                className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-instagram"
                role="img"
                aria-label="logo instagram"
              ></ion-icon>
            </a>
            <a className="p-1 -m-1 group" aria-label="Follow on GitHub" href="#_">
              <ion-icon
                className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-github"
                role="img"
                aria-label="logo github"
              ></ion-icon>
            </a>
            <a className="p-1 -m-1 group" aria-label="Follow on LinkedIn" href="#_">
              <ion-icon
                className="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-linkedin"
                role="img"
                aria-label="logo linkedin"
              ></ion-icon>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
