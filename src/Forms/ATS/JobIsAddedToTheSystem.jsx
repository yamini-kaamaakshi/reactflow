import {WebHooks} from "../DefaultFields/FormFields.jsx";
import {Form, Input} from "antd";
import {DueDay} from "../DefaultFields/FormFields.jsx";

// eslint-disable-next-line react/prop-types
const JobIsAddedToTheSystem = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {
        case "JOB_ADDED_SEND_WEBHOOK_NOTIFICATION":
            return (
                    <WebHooks webhooks={webhooks} formData={formData} />
            )

        case 'JOB_ADDED_ADD_TASK_TO_OWNER':
            return (
                <>
                    <DueDay formData={formData} />
            <Form.Item
                label="Subject:"
                name="subject"
                rules={[{ required: true}]}
                initialValue={formData?.subject}
            >
                <div className="input-group">
                    <Input
                        type="text"
                        placeholder="Subject"
                        defaultValue={formData?.subject}
                    />
                </div>
            </Form.Item>
            <Form.Item
                label="Message:"
                name="message"
                rules={[{ required: true}]}
                initialValue={formData?.message}
            >
                <div className="input-group">
                    <Input.TextArea
                        rows={5}
                        placeholder="Message"
                        style={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                    />
                </div>
            </Form.Item>
                </>
            )
        default:
            return ;
    }
};

export default JobIsAddedToTheSystem;
