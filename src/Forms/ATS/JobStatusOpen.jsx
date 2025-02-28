import { Alert, Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {WhenAfterDays,WebHooks, SendAsRadioButtons,
    SenderSelection,
    SubjectField,
    MessageField,
    DueDateDropdown,} from "../DefaultFields/FormFields.jsx";

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

                    {/* Reusable Send As Radio Buttons */}
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs} />


                    {/* Reusable Sender Selection */}
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />

                    {/* Reusable Subject Field */}
                    <SubjectField formData={formData} subject={subject} setSubject={setSubject} />


                    {/* Reusable Message Field */}
                    <MessageField formData={formData} message={message} setMessage={setMessage} />
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


                    {/* Reusable Due Date Dropdown */}
                    <DueDateDropdown formData={formData} />






                    {/* Reusable Subject Field */}
                    <SubjectField formData={formData} subject={subject} setSubject={setSubject} />


                    {/* Reusable Message Field */}
                    <MessageField formData={formData} message={message} setMessage={setMessage} />
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
