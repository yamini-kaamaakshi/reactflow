import {useState} from "react";
import {Message, SendAs, Subject, UserDropdown, WebHooks} from "../DefaultFields/FormFields.jsx";


const ContactIsAddedManually = ({actionCode, webhooks, users,formData}) => {
    const [sendAs, setSendAs] = useState(formData?.sendAs || "DEFAULT");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    switch (actionCode) {

        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAs sendAs={sendAs} setSendAs={setSendAs} formData={formData}/>
                    <Subject subject={subject} setSubject={setSubject} formData={formData}/>
                    <Message message={message} setMessage={setMessage} formData={formData}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_CONTACT":
            return (
                <>
                    <SendAs sendAs={sendAs} setSendAs={setSendAs} formData={formData}/>
                    <Subject subject={subject} setSubject={setSubject} formData={formData}/>
                    <Message message={message} setMessage={setMessage} formData={formData}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        default:
            return null;
    }
};

export default ContactIsAddedManually;