import { Form, Input} from "antd";
import {WebHooks,DueDay} from "../DefaultFields/FormFields.jsx";


// DefaultFormItem now renders an Input field with the given props
const DaysBeforeExpire = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValue={formData?.when}

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
const JobIsAboutToExpire = ({actionCode,webhooks,formData }) => {
    switch (actionCode) {
        case "JOB_EXPIRY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <DaysBeforeExpire formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
                </>
            );

        case "JOB_EXPIRY_SEND_EMAIL_TO_CONCERNED_USERS":
        case "JOB_EXPIRY_SEND_EMAIL_TO_OWNER":
            return (
                <DaysBeforeExpire formData={formData}/>
            );

        case 'JOB_EXPIRY_ADD_TASK_TO_OWNER':
            return (
                <>
                    <DaysBeforeExpire formData={formData}/>
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
            );
        default:
            return ;
    }
};

export default JobIsAboutToExpire;