
import WebHooks from "./DefaultFields/WebHooks.jsx";
import DueDate from "./DefaultFields/DueDate.jsx";


// eslint-disable-next-line react/prop-types
const JobApplicationIsNotReviewed = ({ actionCode,formData,webhooks }) => {

    switch (actionCode) {
        case "JOB_APPLICATION_RECEIVED_SEND_WEBHOOK_NOTIFICATION":
            return (
               <>
                    <WebHooks webhooks={webhooks} />
               </>
            );

        case 'JOB_APPLICATION_RECEIVED_ADD_TASK_TO_OWNER':
            return (
                <>
                    <DueDate formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default JobApplicationIsNotReviewed;
