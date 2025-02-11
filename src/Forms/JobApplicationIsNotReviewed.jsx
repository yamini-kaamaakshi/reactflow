import {Form} from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import DueDate from "./DefaultFields/DueDate.jsx";
import AddAction from "./DefaultFields/AddAction.jsx";

// eslint-disable-next-line react/prop-types
const JobApplicationIsNotReviewed = ({ actionCode, handleFormSubmit,formData,webhooks }) => {

    switch (actionCode) {
        case "JOB_APPLICATION_RECEIVED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <WebHooks webhooks={webhooks} />
                    <AddAction />
                </Form>
            )

        case 'JOB_APPLICATION_RECEIVED_ADD_TASK_TO_OWNER':
            return (
                <Form onFinish={handleFormSubmit}>
                    <DueDate formData={formData} />
                    <AddAction />
                </Form>
            )
        default:
            return ;
    }
};

export default JobApplicationIsNotReviewed;
