import {useState} from "react";
import {Message, SendAsRadioButtons, Subject, UserDropdown, WebHooks} from "../DefaultFields/FormFields.jsx";


const ContactIsAddedManually = ({actionCode, webhooks, users}) => {
    const [sendAs, setSendAs] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    switch (actionCode) {

        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users}/>
                    <SendAsRadioButtons sendAs={sendAs} setSendAs={setSendAs}/>
                    <Subject subject={subject} setSubject={setSubject}/>
                    <Message message={message} setMessage={setMessage}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_CONTACT":
            return (
                <>
                    <SendAsRadioButtons sendAs={sendAs} setSendAs={setSendAs}/>
                    <Subject subject={subject} setSubject={setSubject}/>
                    <Message message={message} setMessage={setMessage}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WebHooks webhooks={webhooks}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    <WebHooks webhooks={webhooks}/>
                </>
            );

        default:
            return null;
    }
};

export default ContactIsAddedManually;