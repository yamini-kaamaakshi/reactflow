import {Button, Form, Input, Select} from "antd";

const PlacementIscreated = ({ actionCode, handleFormSubmit, sendAs, setSendAs }) => {

    console.log("actionCode - form",actionCode)

    switch (actionCode) {
        case "ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER":
            return (
                <Form onFinish={handleFormSubmit}>
                    <Form.Item
                        label="When:"
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][actionData][days]]"
                        rules={[{ required: true, message: "Please input the number of days!" }]}
                    >
                        <Input type="number" placeholder="1" step="1" min="0" max="1500" />
                    </Form.Item>

                    <Form.Item
                        label="Send as:"
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][actionData][sendAs]]"
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
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][actionData][subject]]"
                    >
                        <Input placeholder="Subject" maxLength={128} />
                    </Form.Item>

                    <Form.Item
                        label="Message:"
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][actionData][message]]"
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <input
                        type="hidden"
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][id]]"
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
                    <Form.Item
                        label="When:"
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][actionData][days]]"
                        rules={[{ required: true, message: "Please input the number of days!" }]}
                    >
                        <Input type="number" placeholder="1" step="1" min="0" max="1500" />
                    </Form.Item>

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
