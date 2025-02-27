import {WebHooks,Subject,Message} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const CandidatePipelineStatusIsUpdated = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {

        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
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
