import {useState} from "react";
import {
    Message,
    SendAsRadioButtons,
    SenderSelection,
    Sequence,
    Subject,
    UserDropdown,
    WebHooks
} from "../DefaultFields/FormFields.jsx";


const ContactIsAddedManually = ({actionCode, webhooks, users,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_CONTACT":
            return (
                <>
                    <SendAsRadioButtons  setSendAs={setSendAs} formData={formData}/>
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

        case "CONTACT_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    <Sequence formData={formData}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
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

export default ContactIsAddedManually;