import { useState } from "react";
import { Form, Radio, Alert, Select } from "antd";
import {
    Subject,
    DueDay,
    WebHooks,
    SendAsRadioButtons,
    SenderSelection,
    SubjectField,
    MessageField
} from "../DefaultFields/FormFields.jsx";

// eslint-disable-next-line react/prop-types
const ACandidateAddedManually = ({ actionCode, webhooks, formData, senders }) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    switch (actionCode) {
        case "CANDIDATE_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    {/* Email Sender Selection */}
                    <Form.Item
                        label="Send Email from:"
                        name="sendAs"
                        initialValue="default"
                        rules={[{ required: true, message: "Please select a sender type" }]}
                    >
                        <Radio.Group onChange={(e) => setSendAs(e.target.value)} value={sendAs}>
                            <Radio value="default">Default</Radio>

                            <Radio value="emailSender">Email Sender</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Default Selection */}
                    {sendAs === "default" && (
                        <Form.Item label="Sender:">
                            <Alert message="Emails are sent from noreply@recruitly.io account." type="info" />
                        </Form.Item>
                    )}



                    {/* Email Sender Selection with Dropdown */}
                    {sendAs === "emailSender" && (
                        <>
                            <Form.Item>
                                <Alert
                                    message={
                                        <>
                                            <ul>
                                                <li>
                                                    Emails sent using <strong>Connected Inboxes</strong> will use the selected user's mailbox. All reads, replies, and stats are recorded and updated in real-time.
                                                </li>
                                                <li>
                                                    Emails sent using <strong>Sender</strong> use Recruitly's server. Email replies cannot be tracked as Recruitly does not receive responses.
                                                </li>
                                            </ul>
                                        </>
                                    }
                                    type="info"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Sender:"
                                name="emailSender"
                                rules={[{ required: true, message: "Please select a sender" }]}
                            >
                                <Select
                                    value={selectedSender}
                                    onChange={setSelectedSender}
                                    placeholder="Please select..."
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
                        </>
                    )}

                    {/* Reusable Subject Field */}
                    <SubjectField formData={formData} subject={subject} setSubject={setSubject} />

                    {/* Reusable Message Field */}
                    <MessageField formData={formData} message={message} setMessage={setMessage} />
                </>
            );

        case "CANDIDATE_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return <WebHooks webhooks={webhooks} formData={formData} />;

        case "CANDIDATE_ADDED_MANUALLY_SEND_EMAIL_REQUESTING_UPDATES":
            return (
                <>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs} />
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <SubjectField formData={formData} subject={subject} setSubject={setSubject} />
                    <MessageField formData={formData} message={message} setMessage={setMessage} />
                </>
            );

        case "CANDIDATE_ADDED_MANUALLY_ADD_TASK_TO_OWNER":
            return (
                <>
                    <DueDay formData={formData} />
                    <Subject formData={formData} />
                    <MessageField formData={formData} message={message} setMessage={setMessage} />
                </>
            );

        default:
            return null;
    }
};

export default ACandidateAddedManually;
