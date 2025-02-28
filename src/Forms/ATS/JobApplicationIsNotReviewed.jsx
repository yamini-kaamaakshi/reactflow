import {SendAs, Sender, WebHooks,DueDate,WhenApplicationIsNotProcessedFor,
    Subject,Message} from "../DefaultFields/FormFields.jsx";


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
                    <SendAs formData={formData} />
                    <Sender formData={formData} />
                </>
            );

        case 'JOB_APPLICATION_RECEIVED_SEND_EMAIL_TO_OWNER':
            return (
                <>
                    <WhenApplicationIsNotProcessedFor formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );

        case 'JOB_APPLICATION_RECEIVED_SEND_EMAIL_TO_SENDER':
            return (
                <>
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );

        case 'JOB_APPLICATION_RECEIVED_SEND_EMAIL_TO_CANDIDATE':
        case 'JOB_APPLICATION_RECEIVED_SEND_EMAIL_TO_RECRUITING_TEAM_MEMBER':
                    return (
                        <>
                            <Subject formData={formData} />
                            <Message formData={formData} />
                        </>
                    );
        default:
            return;
    }
};

export default JobApplicationIsNotReviewed;
