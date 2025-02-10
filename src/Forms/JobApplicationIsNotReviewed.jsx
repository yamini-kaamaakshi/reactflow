import {Button, Form} from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import WhenAfterDays from "./DefaultFields/WhenAfterDays.jsx";
import DueDate from "./DefaultFields/DueDate.jsx";



// eslint-disable-next-line react/prop-types
const JobApplicationIsNotReviewed = ({ actionCode, handleFormSubmit,formData,webhooks }) => {

    switch (actionCode) {
        case "JOB_APPLICATION_RECEIVED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <WebHooks webhooks={webhooks} />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )

        case 'JOB_APPLICATION_RECEIVED_ADD_TASK_TO_OWNER':
            return (
                <Form onFinish={handleFormSubmit}>
                    <DueDate formData={formData} />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )
        default:
            return ;
    }
};

export default JobApplicationIsNotReviewed;
