const greeting = () => {
  let curDate = new Date();
  curDate = curDate.getHours();
  let greeting = "";

  if (curDate >= 0 && curDate < 12) {
    greeting = "Good Morning";
  } else if (curDate >= 12 && curDate < 18) {
    greeting = "Good Afternoon";
  } else if (curDate >= 18 && curDate < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  return greeting;
};

export default greeting;
