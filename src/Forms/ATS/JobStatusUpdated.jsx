import {useState} from "react";
import {Subject, Message, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const JobStatusUpdated = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "JOB_STATUS_UPDATED_SEND_EMAIL_TO_JOB_OWNER":
        case "JOB_STATUS_UPDATED_SEND_EMAIL_TO_CLIENT":
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
        default:
            return ;
    }
};

export default JobStatusUpdated;
