import {Button, Form} from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import DueDate from "./DefaultFields/DueDate.jsx";



// eslint-disable-next-line react/prop-types
const JobIsAddedToTheSystem = ({ actionCode, handleFormSubmit,webhooks,formData }) => {

    switch (actionCode) {
        case "JOB_ADDED_SEND_WEBHOOK_NOTIFICATION":
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

        case 'JOB_ADDED_ADD_TASK_TO_OWNER':
            return (
                <Form onFinish={handleFormSubmit}>
                    <DueDate formData={formData} />

                </Form>
            )
        default:
            return ;
    }
};

export default JobIsAddedToTheSystem;
