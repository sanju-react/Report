import emailjs from "emailjs-com";

export const sendEmail = (emailData) => {
  // Replace these values with your EmailJS template information
  const templateId = "template_s2448br";
  const userId = "D80Jjb41ZQ-_qFqup";

  // Replace these values with the actual data you want to send
  const data = {
    to_name: emailData.to_name,
    reply_to: emailData.reply_to,
    subject: emailData.subject,
    message: emailData.message,
  };

  // Send email using EmailJS
  emailjs
    .send("service_txwnkqa", templateId, data, userId)
    .then((response) => {
      // console.log('Email sent successfully:', response);
      alert("Email sent successfully");
    })
    .catch((error) => {
      // console.error('Error sending email:', error);
      alert(error.message);
    });
};

// import emailjs from 'emailjs-com';
// import toastr from 'toastr';

// export const sendEmail = (e) => {
//     e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

//     emailjs.sendForm('service_vjjj5fh', 'template_nun3zyl', e.target, 'c-SWSrzxABxtLtcaj')
//         .then((result) => {
//             console.log(result);
//             toastr.success("The data sent successfully.")
//             // window.location.reload()
//         }, (error) => {
//             console.log(error.message);
//             toastr.alert(error.message)
//         });
// }
