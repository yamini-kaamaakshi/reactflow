import {Message, SendAsRadioButtons, SenderSelection, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";


const LeadStatusIsUpdated = ({actionCode, users,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "LEAD_STATUS_UPDATED_SEND_EMAIL_TO_LEAD":
        case "LEAD_STATUS_UPDATED_SEND_EMAIL_TO_LEAD_OWNER":
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

        case "LEAD_STATUS_UPDATED_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users}/>
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

export default LeadStatusIsUpdated;