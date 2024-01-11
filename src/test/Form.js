
import React from 'react';
import emailjs from 'emailjs-com';

export default function Form() {

    function sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

        emailjs.sendForm('service_vjjj5fh', 'template_nun3zyl', e.target, 'c-SWSrzxABxtLtcaj')
            .then((result) => {
                console.log(result);
                // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <form className="contact-form" onSubmit={sendEmail}>
            <input type="hidden" name="contact_number" />
            <label>Name</label>
            <input type="text" name="to_name" />
            <label>Email</label>
            <input type="email" name="reply_to" />
            <label>Subject</label>
            <input type="text" name="subject" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    );
}