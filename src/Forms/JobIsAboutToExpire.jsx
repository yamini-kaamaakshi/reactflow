import { Form, Input } from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import AddAction from "./DefaultFields/AddAction.jsx";

// DefaultFormItem now renders an Input field with the given props
const DefaultFormItem = () => (
    <Form.Item
        label="WhenAfterDays:"
        name="when"
        rules={[{ required: true, message: "Please input the number of days!" }]}
    >
        <div className="input-group">
            <Input
                type="number"
                title="After Days"
                placeholder="1"
                autoComplete="off"
                step="1"
                min="1"
                max="1500"
                addonAfter="Days Before Expire"
            />
        </div>
    </Form.Item>
);
// eslint-disable-next-line react/prop-types
const JobIsAboutToExpire = ({handleFormSubmit, actionCode,webhooks }) => {
    switch (actionCode) {
        case "JOB_EXPIRY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <DefaultFormItem/>

                  <WebHooks webhooks={webhooks} />

                    <AddAction/>
                </Form>
            );

        case "JOB_EXPIRY_SEND_EMAIL_TO_CONCERNED_USERS":
        case "JOB_EXPIRY_SEND_EMAIL_TO_OWNER":
        case 'JOB_EXPIRY_ADD_TASK_TO_OWNER':

            return (
                <Form onFinish={handleFormSubmit}>
                    <DefaultFormItem/>
                    <AddAction/>
                </Form>
            );
        default:
            return ;
    }
};

export default JobIsAboutToExpire;
