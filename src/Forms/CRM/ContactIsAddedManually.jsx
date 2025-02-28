import {useState} from "react";
import {Message, SendAsRadioButtons, Subject, UserDropdown, WebHooks} from "../DefaultFields/FormFields.jsx";


const ContactIsAddedManually = ({actionCode, webhooks, users,formData}) => {
    const [sendAs, setSendAs] = useState(formData?.sendAs || "DEFAULT");

    switch (actionCode) {
        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAsRadioButtons sendAs={sendAs} setSendAs={setSendAs} formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_CONTACT":
            return (
                <>
                    <SendAsRadioButtons sendAs={sendAs} setSendAs={setSendAs} formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
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