import {Subject, Message, WhenDaysBefore, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const JobInterviewIsDue = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "JOB_INTERVIEW_DUE_SEND_SMS_TO_CLIENT":
        case "JOB_INTERVIEW_DUE_SEND_SMS_TO_CANDIDATE":
            return (
                <>
                    <WhenDaysBefore formData={formData} />
                    <Message formData={formData} />

                </>
            )

        case "JOB_INTERVIEW_DUE_SEND_EMAIL_TO_CLIENT":
        case "JOB_INTERVIEW_DUE_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                    <WhenDaysBefore formData={formData} />
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
            )
        default:
            return ;
    }
};

export default JobInterviewIsDue;