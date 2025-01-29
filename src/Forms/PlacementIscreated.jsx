import {Button, Form, Input, Select} from "antd";



const DefaultFormItem = () => (
    <Form.Item
        label="When:"
        rules={[{ required: true, message: "Please input the number of days!" }]}
    >
        <div className="input-group">
            <Input
                type="number"
                title="After Days"
                placeholder="1"
                autoComplete="off"
                step="1"
                min= "1"
                max="1500"
                addonBefore="After"
                addonAfter="Days"
            />
        </div>
    </Form.Item>
);


const PlacementIscreated = ({ actionCode, handleFormSubmit, sendAs, setSendAs }) => {
    switch (actionCode) {
        case "ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER":
            return (
                <Form onFinish={handleFormSubmit}>
                    <DefaultFormItem />

                    <Form.Item
                        label="Send as:"
                    >
                        <label className="text-regular">
                            <input
                                type="radio"
                                name="sendAs"
                                value="DEFAULT"
                                checked={sendAs === "DEFAULT"}
                                onChange={(e) => setSendAs(e.target.value)}
                            />
                            {" "}Default
                        </label>
                        <label className="text-regular">
                            <input
                                type="radio"
                                name="sendAs"
                                value="RECORD_OWNER"
                                checked={sendAs === "RECORD_OWNER"}
                                onChange={(e) => setSendAs(e.target.value)}
                            />
                            {" "}Record owner
                        </label>
                        <label className="text-regular">
                            <input
                                type="radio"
                                name="sendAs"
                                value="EMAIL_SENDER"
                                checked={sendAs === "EMAIL_SENDER"}
                                onChange={(e) => setSendAs(e.target.value)}
                            />
                            {" "}Email Sender
                        </label>
                    </Form.Item>

                    <Form.Item label="Sender:">
                        {sendAs === "DEFAULT" && (
                            <div className="default-response-email">
                                Emails are sent from <b>noreply@recruitly.io</b> account.
                            </div>
                        )}
                        {sendAs === "RECORD_OWNER" && (
                            <div className="record-owner-response-email">
                                Emails are sent from the record owner's email account. For example, emails will be sent from <b>andy@hireoptica.com</b>
                            </div>
                        )}
                        {sendAs === "EMAIL_SENDER" && (
                            <Select
                                title="Select Email Sender"
                                className="form-control sel-email-sender"
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

                    <Form.Item
                        label="Subject:"
                    >
                        <Input placeholder="Subject" maxLength={128} />
                    </Form.Item>

                    <Form.Item
                        label="Message:"
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <input
                        type="hidden"
                        value="hire91d671c1f45d42608c2b7f73d6c2cce3"
                    />

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
                    <DefaultFormItem  />

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
