import { Button, Form, Input, Radio, Select } from "antd";
import { useState } from "react";

const DefaultFormItem = ({ formData }) => (
    <Form.Item
        label="When:"
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
                addonBefore="After"
                addonAfter="Days"
                defaultValue={formData?.when}
            />
        </div>
    </Form.Item>
);

const PlacementIscreated = ({ actionCode, handleFormSubmit, sendAs, setSendAs, formData }) => {

    const [sender, setSender] = useState(formData?.sender || "");

    switch (actionCode) {
        case "ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER":
            return (
                <Form onFinish={handleFormSubmit} initialValues={{
                    sendAs: formData?.sendAs || "DEFAULT",
                    sender: formData?.sender || "",
                    subject: formData?.subject || "",
                    message: formData?.message || ""
                }}>
                    <DefaultFormItem formData={formData} />

                    <Form.Item label="Send as:" name="sendAs">
                        <Radio.Group
                            onChange={(e) => setSendAs(e.target.value)}
                            value={sendAs}
                        >
                            <Radio value="DEFAULT">Default</Radio>
                            <Radio value="RECORD_OWNER">Record owner</Radio>
                            <Radio value="EMAIL_SENDER">Email Sender</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Sender:" name="sender">
                        {sendAs === "DEFAULT" && (
                            <div className="default-response-email">
                                Emails are sent from <b>noreply@recruitly.io</b> account.
                            </div>
                        )}
                        {sendAs === "RECORD_OWNER" && (
                            <div className="record-owner-response-email">
                                Emails are sent from the record owner's email account.
                            </div>
                        )}
                        {sendAs === "EMAIL_SENDER" && (
                            <Select
                                title="Select Email Sender"
                                className="form-control sel-email-sender"
                                value={sender}
                                onChange={setSender}
                            >
                                <Select.Option value="weavbba8751e5f53483f852ab61be082c05c">
                                    Gary Williams 123
                                </Select.Option>
                                <Select.Option value="test77da082deb5944ea80241166e8094311">
                                    Andy
                                </Select.Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="Subject:" name="subject">
                        <Input placeholder="Subject" maxLength={128} />
                    </Form.Item>

                    <Form.Item label="Message:" name="message">
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <input type="hidden" value="hire91d671c1f45d42608c2b7f73d6c2cce3" />

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );

        case "ATS_PLACEMENT_CREATED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <DefaultFormItem formData={formData} initialValues={{ when: formData?.when }}/>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );

        default:
            return <div>Invalid Action Code.</div>;
    }
};

export default PlacementIscreated;
