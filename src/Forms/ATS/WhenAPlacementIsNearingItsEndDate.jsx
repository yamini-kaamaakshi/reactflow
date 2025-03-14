import {Form, Input, Select} from "antd";
import {
    WhenBeforeDays,
    Subject,
    Message,
    DueDay,
    WebHooks,
    SendAsRadioButtons,
    SenderSelection
} from "../DefaultFields/FormFields.jsx";
import {useEffect, useState} from "react";


// eslint-disable-next-line react/prop-types
const WhenAPlacementIsNearingItsEndDate = ({actionCode, formData, webhooks, senders,emailSequences}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [sequences, setSequences] = useState([]);

    useEffect(() => {
        console.log("emailSequences data:", emailSequences);

        if (Array.isArray(emailSequences)) {
            setSequences(emailSequences);
        }
    }, [emailSequences]);

    console.log("Sequences in state:", sequences);

    switch (actionCode) {
        case "ATS_PLACEMENT_ABOUT_END_SEND_EMAIL_TO_USER":
            return (
                <>
                    <WhenBeforeDays formData={formData}/>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "ATS_PLACEMENT_ABOUT_END_ADD_CANDIDATE_TO_SEQUENCE":
            return (
                <>
                    <WhenBeforeDays formData={formData}/>
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

        case "ATS_PLACEMENT_ABOUT_END_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenBeforeDays formData={formData}/>
                    <DueDay formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "ATS_PLACEMENT_ABOUT_END_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WhenBeforeDays formData={formData}/>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "ATS_PLACEMENT_ABOUT_END_SEND_SMS_TO_CANDIDATE":
            return (
                <>
                    <WhenBeforeDays formData={formData}/>
                    <Form.Item
                        label="Message:"
                        name="message"
                        rules={[{required: true}]}
                        initialValue={formData?.message}
                    >
                        <div className="input-group">
                            <Input.TextArea
                                rows={5}
                                placeholder="Message"
                                style={{
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                }}
                            />
                        </div>
                    </Form.Item>
                </>
            );

        case "ATS_PLACEMENT_ABOUT_END_SEND_EMAIL_TO_CLIENT":
        case "ATS_PLACEMENT_ABOUT_END_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                    <WhenBeforeDays formData={formData}/>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );
        default:
            return;
    }
};

export default WhenAPlacementIsNearingItsEndDate;