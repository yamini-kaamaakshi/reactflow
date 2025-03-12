import { Form, Input, Select } from "antd";
import {
    WebHooks,
    Subject,
    Message,
    WhenAfterDays,
    SendAsRadioButtons,
    SenderSelection,
    DueDay
} from "../DefaultFields/FormFields.jsx";

import { useState, useEffect } from "react";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const PlacedCandidateHasStarted = ({ actionCode, webhooks, formData, senders, emailSequences }) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [sequences, setSequences] = useState([]);

    useEffect(() => {
        console.log("emailSequences data:", emailSequences);

        if (Array.isArray(emailSequences)) {
            setSequences(emailSequences); // Use emailSequences directly
        }
    }, [emailSequences]);

    console.log("Sequences in state:", sequences);


    switch (actionCode) {
        case "ATS_PLACEMENT_STARTED_ADD_CANDIDATE_TO_SEQUENCE":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <Form.Item
                        label="Sequence"
                        name="sequence"
                        rules={[{ required: true, message: "Please select a sequence!" }]}
                    >
                        <Select placeholder="Please select..." onChange={(value) => setSelectedSender(value)}>
                            {sequences.length > 0 ? (
                                sequences.map((sequence) => (
                                    <Option key={sequence._id} value={sequence._id}>
                                        {sequence.name}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>No data</Option>
                            )}
                        </Select>

                    </Form.Item>
                </>
            );

        case "ATS_PLACEMENT_STARTED_SEND_EMAIL_TO_USER":
        case "ATS_PLACEMENT_STARTED_SEND_EMAIL_TO_CLIENT":
        case "ATS_PLACEMENT_STARTED_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs} />
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );

        case "ATS_PLACEMENT_STARTED_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <DueDay formData={formData} />
                    <Form.Item
                        label="Subject:"
                        name="subject"
                        rules={[{ required: true }]}
                        initialValue={formData?.subject}
                    >
                        <div className="input-group">
                            <Input
                                type="text"
                                placeholder="Subject"
                                defaultValue={formData?.subject}
                            />
                        </div>
                    </Form.Item>
                    <Message formData={formData} />
                </>
            );

        case "ATS_PLACEMENT_STARTED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
                </>
            );

        default:
            return null;
    }
};

export default PlacedCandidateHasStarted;
