import {useState} from "react";
import {
    WebHooks,
    WhenJobIsOpenFor,
    DueDay,
    Subject,
    Message,
    SendAsRadioButtons, SenderSelection
} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const WhenJobStatusIsOpen = ({ actionCode, formData,webhooks,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "JOB_OPEN_SEND_EMAIL_TO_OWNER":
            return (
             <>
             <WhenJobIsOpenFor formData={formData} />
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

        case "JOB_OPEN_SEND_WEBHOOK_NOTIFICATION":
            return (
              <>
                    <WhenJobIsOpenFor formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
              </>
            )

        case "JOB_OPEN_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenJobIsOpenFor formData={formData} />
                    <DueDay formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            )

        case "JOB_OPEN_MARK_JOB_STATUS_AS_CLOSED":
            return (
             <>
                    <WhenJobIsOpenFor formData={formData} />
                </>
            )

        default:
            return ;
    }
};

export default WhenJobStatusIsOpen;