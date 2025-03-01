import {useState} from "react";
import {Subject, DueDay, Message, WebHooks, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const ACandidateAddedManually = ({actionCode, webhooks, formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "CANDIDATE_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "CANDIDATE_ADDED_MANUALLY_SEND_EMAIL_REQUESTING_UPDATES":
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
                    <Message formData={formData} />
                </>
            )

        case "CANDIDATE_ADDED_MANUALLY_ADD_TASK_TO_OWNER":
            return (
                <>
                    <DueDay formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            )
        default:
            return;
    }
};

export default ACandidateAddedManually;