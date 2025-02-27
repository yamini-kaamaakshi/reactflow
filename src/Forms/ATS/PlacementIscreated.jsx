import { Button, Form, Input, Radio, Select } from "antd";
import { useState} from "react";
import {FormFields} from "../DefaultFields/FormFields.jsx";



// eslint-disable-next-line react/prop-types
const PlacementIscreated = ({ actionCode, handleFormSubmit, formData }) => {
    const [sendAs, setSendAs] = useState(formData?.sendAs || "DEFAULT");
    const [sender, setSender] = useState(formData?.sender );
    const [dueDate, setDueDate] = useState("0");

    const handleChange = (value) => {
        setDueDate(value);
    };
    switch (actionCode) {
        case "ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER":
        case 'ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_CANDIDATE':
            return (
                <Form onFinish={handleFormSubmit} initialValues={{
                    sendAs: formData?.sendAs || "DEFAULT",
                    sender: formData?.sender || "",
                    subject: formData?.subject || "",
                    message: formData?.message || ""
                }}>
                    <FormFields formData={formData} />

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
                    <FormFields formData={formData} />

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        case "ATS_PLACEMENT_CREATED_ADD_TASK_CONCERNED_USERS":
        case 'ATS_PLACEMENT_CREATED_ADD_TASK_TO_OWNER':
            return (
                <Form onFinish={handleFormSubmit}>
                    <FormFields formData={formData} />
                    <Form.Item label="Due Date:" name="dueDate">
                        <Select
                            className="form-control"
                            value={dueDate}
                            onChange={handleChange}
                        >
                            <Select.Option value="0">Same Day</Select.Option>
                            <Select.Option value="1">After 1 Day</Select.Option>
                            <Select.Option value="2">After 2 Days</Select.Option>
                            <Select.Option value="3">After 3 Days</Select.Option>
                            <Select.Option value="4">After 4 Days</Select.Option>
                            <Select.Option value="5">After 5 Days</Select.Option>
                            <Select.Option value="7">After 1 Week</Select.Option>
                            <Select.Option value="14">After 2 Weeks</Select.Option>
                            <Select.Option value="30">After 1 Month</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Message:"
                        name="message"
                        initialValue={"Placement added for job ${jobRef}."}
                    >
                        <Input.TextArea
                            rows={5}
                            placeholder="Message"
                            style={{
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        default:
            return ;
    }
};

export default PlacementIscreated;
