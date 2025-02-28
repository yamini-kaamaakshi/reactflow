import {Alert, Form, Input, Radio, Select} from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

// eslint-disable-next-line react/prop-types
const PipelineStatusUpdate = ({ actionCode, formData, webhooks,pipelineStatuses, senders  }) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");




    switch (actionCode) {
        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_EMAIL_TO_CANDIDATE":


            return (
                <>

                    {/* Pipeline Status Dropdown */}
                    <Form.Item
                        label="Pipeline Status:"
                        name="pipelineStatus"
                        rules={[{ required: true, message: "Please select a pipeline status" }]}
                    >
                        <Select placeholder="Select Pipeline Status">
                            {[...new Set(pipelineStatuses?.map((status) => status.statusName))].map(
                                (uniqueStatus) => (
                                    <Select.Option key={uniqueStatus} value={uniqueStatus}>
                                        {uniqueStatus}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>

                    {/* Send As Radio Button Group */}


                    <Form.Item
                        label="Send as:"
                        name="sendAs"
                        initialValue="default" // ✅ Ensures "default" is selected initially

                        rules={[{ required: true, message: "Please select a sender type" }]}
                    >


                        <Radio.Group onChange={(e) => setSendAs(e.target.value)}>
                            <Radio value="default">Default</Radio>

                            <Radio value="recordOwner">Record Owner</Radio>
                            <Radio value="emailSender">Email Sender</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Sender Field - Displays Based on Send As Selection */}
                    {sendAs === "default" && (
                        <Form.Item label="Sender:">
                            <Alert message="Emails are sent from noreply@recruitly.io account." type="info" />
                        </Form.Item>
                    )}

                    {sendAs === "recordOwner" && (
                        <Form.Item label="Sender:">
                            <Alert message="Emails are sent from record owner email account." type="info" />
                        </Form.Item>
                    )}

                    {/* Sender Dropdown from API */}
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
                                    .filter((sender) => sender.fromEmail && sender.fromName) // ✅ Ensure valid data
                                    .map((sender) => (
                                        <Select.Option key={sender.id} value={sender.fromEmail}>
                                            {sender.fromName} - {sender.fromEmail}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>



                    )}

                    {/* Subject Field Under Sender */}
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


                        {/* Message Box (React Quill) */}
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



        case "CANDIDATE_PIPELINE_STATUS_UPDATED_SEND_WEBHOOK_NOTIFICATION":

            return (

                <>

                    {/* Pipeline Status Dropdown */}
                    <Form.Item
                        label="Pipeline Status:"
                        name="pipelineStatus"
                        rules={[{ required: true, message: "Please select a pipeline status" }]}
                    >
                        <Select placeholder="Select Pipeline Status">
                            {[...new Set(pipelineStatuses?.map((status) => status.statusName))].map(
                                (uniqueStatus) => (
                                    <Select.Option key={uniqueStatus} value={uniqueStatus}>
                                        {uniqueStatus}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>

                    <WebHooks webhooks={webhooks} />
                </>
            );

        default:
            return null;
    }
};

export default PipelineStatusUpdate;
