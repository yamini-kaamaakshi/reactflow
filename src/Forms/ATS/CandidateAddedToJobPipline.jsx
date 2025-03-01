import {SendAsRadioButtons, WebHooks, Subject, Message, SenderSelection} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const CandidateAddedToJobPipline = ({ actionCode,webhooks,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_EMAIL":
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

        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_WEBHOOK_NOTIFICATION":
            return (
                <WebHooks webhooks={webhooks} formData={formData} />
            );
        default:
            return ;
    }
};

export default CandidateAddedToJobPipline;
