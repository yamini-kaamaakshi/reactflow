import {useState} from "react";
import {WebHooks, Subject, Message, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const CandidatePipelineStatusIsUpdated = ({ actionCode,webhooks,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );

        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_WEBHOOK_NOTIFICATION":
            return (

                <WebHooks webhooks={webhooks} formData={formData} />
            );
        default:
            return ;
    }
};

export default CandidatePipelineStatusIsUpdated;