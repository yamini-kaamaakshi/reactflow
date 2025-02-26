import WebHooks from "./DefaultFields/WebHooks.jsx";
import Subject from "./DefaultFields/Subject.jsx";
import Message from "./DefaultFields/Message.jsx";


// eslint-disable-next-line react/prop-types
const CandidatePipelineStatusIsUpdated = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {
        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_WEBHOOK_NOTIFICATION":
            return (

                <WebHooks webhooks={webhooks} formData={formData} />
            );
        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                <Subject formData={formData} />
                <Message formData={formData} />
                </>
            )
        default:
            return ;
    }
};

export default CandidatePipelineStatusIsUpdated;
