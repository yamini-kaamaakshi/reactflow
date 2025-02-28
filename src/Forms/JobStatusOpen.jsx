import { Alert, Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import WhenAfterDays from "./DefaultFields/WhenAfterDays.jsx";
import WebHooks from "./DefaultFields/WebHooks.jsx";

// eslint-disable-next-line react/prop-types
const JobStatusOpen = ({ actionCode, senders, formData , webhooks , jobStatuses }) => { // Added formData here
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    switch (actionCode) { // Removed formData from here; it's not needed in the switch
        case "JOB_OPEN_SEND_EMAIL_TO_OWNER":
            return (
                <>
                    <WhenAfterDays formData={formData} /> {/* formData is now available */}

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

        case "JOB_OPEN_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <WebHooks webhooks={webhooks} />
                </>
            )
        case "JOB_OPEN_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenAfterDays formData={formData} /> {/* formData is now available */}

                    {/* Due Date Dropdown */}
                    <Form.Item
                        label="Due Date:"
                        name="dueDays"
                        rules={[{ required: true, message: "Please select a due date" }]}
                    >
                        <Select placeholder="Select Due Date">
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
        case "JOB_OPEN_MARK_JOB_STATUS_AS_CLOSED":
            return (
                <>
                    <WhenAfterDays formData={formData} /> {/* formData is now available */}

                    <Form.Item
                        label="Job Status:"
                        name="jobStatus"
                        rules={[{ required: true, message: "Please select a job status" }]}
                    >
                        <Select placeholder="Select Job Status">
                            {jobStatuses?.map((status) => (
                                <Select.Option key={status.id} value={status.code}>
                                    {status.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>



                </>
            );

        default:
            return null;
    }
};

export default JobStatusOpen;
