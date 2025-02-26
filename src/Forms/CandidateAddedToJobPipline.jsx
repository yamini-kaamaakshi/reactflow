import WebHooks from "./DefaultFields/WebHooks.jsx";


// eslint-disable-next-line react/prop-types
const CandidateAddedToJobPipline = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {
        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_WEBHOOK_NOTIFICATION":
            return (

                <WebHooks webhooks={webhooks} formData={formData} />
            );
        default:
            return ;
    }
};

export default CandidateAddedToJobPipline;
