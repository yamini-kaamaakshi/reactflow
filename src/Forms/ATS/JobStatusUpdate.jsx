import { Alert, Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {WebHooks,WhenAfterDays} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const JobStatusUpdate = ({ actionCode, formData, webhooks, senders }) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    if (actionCode === "JOB_STATUS_UPDATED_SEND_EMAIL_TO_CLIENT") {
        return (
            <>
                {/* Send As Radio Button Group */}
                <Form.Item
                    label="Send as:"
                    name="sendAs"
                    initialValue="default"
                    rules={[{ required: true, message: "Please select a sender type" }]}
                >
                    <Radio.Group onChange={(e) => setSendAs(e.target.value)}>
                        <Radio value="default">Default</Radio>
                        <Radio value="recordOwner">Record Owner</Radio>
                        <Radio value="emailSender">Email Sender</Radio>
                    </Radio.Group>
                </Form.Item>

                {/* Sender Field Based on Selection */}
                {sendAs === "default" && (
                    <Form.Item label="Sender:">
                        <Alert message="Emails are sent from noreply@recruitly.io account." type="info" />
                    </Form.Item>
                )}

                {sendAs === "recordOwner" && (
                    <Form.Item label="Sender:">
                        <Alert message="Emails are sent from record owner email account. Ex: If you are owner of record then emails will be sent from andy@hireoptica.com." type="info" />
                    </Form.Item>
                )}

                {sendAs === "emailSender" && (
                    <Form.Item
                        label="Sender:"
                        name="emailSender"
                        rules={[{ required: true, message: "Please select a sender" }]}
                    >
                        <Select
                            value={selectedSender}
                            onChange={setSelectedSender}
                            placeholder="Select Sender..."
                            style={{ width: "100%" }}
                        >
                            {senders
                                .filter((sender) => sender.fromEmail && sender.fromName)
                                .map((sender) => (
                                    <Select.Option key={sender.id} value={sender.fromEmail}>
                                        {sender.fromName} - {sender.fromEmail}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                )}

                {/* Subject Field */}
                <Form.Item
                    label="Subject:"
                    name="subject"
                    rules={[{ required: true, message: "Please enter a subject" }]}
                >
                    <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter Subject"
                    />
                </Form.Item>

                {/* Message Field */}
                <Form.Item
                    label="Message:"
                    name="message"
                    rules={[{ required: true, message: "Please enter a message" }]}
                >
                    <ReactQuill
                        theme="snow"
                        value={message}
                        onChange={setMessage}
                        placeholder="Type your message here..."
                    />
                </Form.Item>
            </>
        );
    }

    if (actionCode === "JOB_STATUS_UPDATED_SEND_EMAIL_TO_JOB_OWNER") {
        return (
            <>
                {/* Send As Radio Button Group */}
                <Form.Item
                    label="Send as:"
                    name="sendAs"
                    initialValue="default"
                    rules={[{ required: true, message: "Please select a sender type" }]}
                >
                    <Radio.Group onChange={(e) => setSendAs(e.target.value)}>
                        <Radio value="default">Default</Radio>
                        <Radio value="recordOwner">Record Owner</Radio>
                        <Radio value="emailSender">Email Sender</Radio>
                    </Radio.Group>
                </Form.Item>

                {/* Sender Field Based on Selection */}
                {sendAs === "default" && (
                    <Form.Item label="Sender:">
                        <Alert message="Emails are sent from noreply@recruitly.io account." type="info" />
                    </Form.Item>
                )}

                {sendAs === "recordOwner" && (
                    <Form.Item label="Sender:">
                        <Alert message="Emails are sent from record owner email account. Ex: If you are owner of record then emails will be sent from andy@hireoptica.com." type="info" />
                    </Form.Item>
                )}

                {sendAs === "emailSender" && (
                    <Form.Item
                        label="Sender:"
                        name="emailSender"
                        rules={[{ required: true, message: "Please select a sender" }]}
                    >
                        <Select
                            value={selectedSender}
                            onChange={setSelectedSender}
                            placeholder="Select Sender..."
                            style={{ width: "100%" }}
                        >
                            {senders
                                .filter((sender) => sender.fromEmail && sender.fromName)
                                .map((sender) => (
                                    <Select.Option key={sender.id} value={sender.fromEmail}>
                                        {sender.fromName} - {sender.fromEmail}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                )}

                {/* Subject Field */}
                <Form.Item
                    label="Subject:"
                    name="subject"
                    rules={[{ required: true, message: "Please enter a subject" }]}
                >
                    <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter Subject"
                    />
                </Form.Item>

                {/* Message Field */}
                <Form.Item
                    label="Message:"
                    name="message"
                    rules={[{ required: true, message: "Please enter a message" }]}
                >
                    <ReactQuill
                        theme="snow"
                        value={message}
                        onChange={setMessage}
                        placeholder="Type your message here..."
                    />
                </Form.Item>
            </>
        );
    }

    return null; // Ensuring nothing renders for other cases
};

export default JobStatusUpdate;