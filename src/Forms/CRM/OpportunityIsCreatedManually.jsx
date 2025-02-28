import {Message, SendAsRadioButtons, SenderSelection, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";


const OpportunityIsCreatedManually = ({actionCode, users,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "OPPORTUNITY_CREATED_SEND_EMAIL_TO_OPPORTUNITY_CONTACT":
        case "OPPORTUNITY_CREATED_SEND_EMAIL_TO_OPPORTUNITY_OWNER":
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

        case "OPPORTUNITY_CREATED_SEND_EMAIL_TO_SPECIFIED_USERS":
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

export default OpportunityIsCreatedManually;