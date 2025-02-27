import {SendAs, Sender, WebHooks} from "../DefaultFields/FormFields.jsx";
import {Subject} from "../DefaultFields/FormFields.jsx";
import {Message} from "../DefaultFields/FormFields.jsx";



// eslint-disable-next-line react/prop-types
const CandidateAddedToJobPipline = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {
        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_EMAIL":
            return (
                <>
                    <SendAs />
                    <Sender />
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
