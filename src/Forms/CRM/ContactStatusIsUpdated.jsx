import {useState} from "react";
import {Message, SendAs, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";


const ContactStatusIsUpdated = ({actionCode, users,formData}) => {
    const [sendAs, setSendAs] = useState(formData?.sendAs || "DEFAULT");

    switch (actionCode) {
        case "CONTACT_STATUS_UPDATED_SEND_EMAIL_TO_CONTACT":
        case "CONTACT_STATUS_UPDATED_SEND_EMAIL_TO_CONTACT_OWNER":
            return (
                <>
                    <SendAs sendAs={sendAs} setSendAs={setSendAs} formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "CONTACT_STATUS_UPDATED_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAs sendAs={sendAs} setSendAs={setSendAs} formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        default:
            return null;
    }
};

export default ContactStatusIsUpdated;