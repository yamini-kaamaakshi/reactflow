import {useState} from "react";
import {Message, SendAsRadioButtons, SenderSelection, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";


const ContactStatusIsUpdated = ({actionCode, users,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "CONTACT_STATUS_UPDATED_SEND_EMAIL_TO_CONTACT":
        case "CONTACT_STATUS_UPDATED_SEND_EMAIL_TO_CONTACT_OWNER":
            return (
                <>
                    <SendAsRadioButtons setSendAs={setSendAs} formData={formData}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "CONTACT_STATUS_UPDATED_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAsRadioButtons setSendAs={setSendAs} formData={formData}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        default:
            return null;
    }
};

export default ContactStatusIsUpdated;