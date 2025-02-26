import WebHooks from "./DefaultFields/WebHooks.jsx";
import DueDate from "./DefaultFields/DueDate.jsx";

// eslint-disable-next-line react/prop-types
const JobIsAddedToTheSystem = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {
        case "JOB_ADDED_SEND_WEBHOOK_NOTIFICATION":
            return (

                    <WebHooks webhooks={webhooks} formData={formData} />

            )

        case 'JOB_ADDED_ADD_TASK_TO_OWNER':
            return (

                    <DueDate formData={formData} />

            )
        default:
            return ;
    }
};

export default JobIsAddedToTheSystem;
