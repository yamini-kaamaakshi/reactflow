import {useState} from "react";
import {Subject, Message, DueDay, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const ACandidateIsAddedManually = ({actionCode, formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "SEND_GDPR_CONSENT_FOR_MANUALLY_ADDED":
            return (
                <>
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
        case "ADD_TASK_TO_OWNER":
            return (
                <>
                    <DueDay formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>

                </>
            );
        default:
            return;
    }
};

export default ACandidateIsAddedManually;
