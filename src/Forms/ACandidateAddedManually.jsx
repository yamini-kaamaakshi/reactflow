import WebHooks from "./DefaultFields/WebHooks.jsx";
import {Radio} from "antd";
import {useState} from "react";
import Subject from "./DefaultFields/Subject.jsx";
import DueDay from "./DefaultFields/DueDay.jsx";
import Message from "./DefaultFields/Message.jsx";


// eslint-disable-next-line react/prop-types
const ACandidateAddedManually = ({ actionCode,webhooks,formData }) => {
    const [sendAs, setSendAs] = useState(formData?.sendAs || "DEFAULT");
    switch (actionCode) {
        case "CANDIDATE_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (

                <WebHooks webhooks={webhooks} formData={formData} />
            );
        case "CANDIDATE_ADDED_MANUALLY_SEND_EMAIL_REQUESTING_UPDATES":
            return (
                <>
                    <Radio.Group
                        onChange={(e) => setSendAs(e.target.value)}
                        value={sendAs}
                    >
                        <Radio value="DEFAULT">Default</Radio>
                        <Radio value="RECORD_OWNER">Record owner</Radio>
                        <Radio value="EMAIL_SENDER">Email Sender</Radio>
                    </Radio.Group>
                    <Subject formData={formData}/>
                </>
            )
        case "CANDIDATE_ADDED_MANUALLY_ADD_TASK_TO_OWNER":
            return (
                <>
                <DueDay formData={formData} />
                <Subject formData={formData}/>
                <Message formData={formData} />
                 </>
            )
        default:
            return ;
    }
};

export default ACandidateAddedManually;
