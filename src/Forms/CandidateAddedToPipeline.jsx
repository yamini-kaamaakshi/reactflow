import {Alert, Form, Input, Radio, Select} from "antd";
import WhenAfterDays from "./DefaultFields/WhenAfterDays.jsx";

import ReactQuill from "react-quill";
import {useState} from "react";
import WebHooks from "./DefaultFields/WebHooks.jsx";

// eslint-disable-next-line react/prop-types
const CandidateAddedToPipeline = ({actionCode, senders, formData ,webhooks }) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    switch (actionCode) {

        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_EMAIL":
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

        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WebHooks webhooks={webhooks} />
                </>
            );


        default:
            return ;K
    }
};

export default CandidateAddedToPipeline;