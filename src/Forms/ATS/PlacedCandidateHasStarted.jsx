import {Form, Input} from "antd";
import {
    WebHooks,
    Subject,
    Message,
    WhenAfterDays,
    SendAsRadioButtons,
    SenderSelection, DueDay
} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const PlacedCandidateHasStarted = ({ actionCode,webhooks,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "ATS_PLACEMENT_STARTED_SEND_EMAIL_TO_USER":
        case "ATS_PLACEMENT_STARTED_SEND_EMAIL_TO_CLIENT":
        case "ATS_PLACEMENT_STARTED_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            )

        case "ATS_PLACEMENT_STARTED_ADD_CANDIDATE_TO_SEQUENCE":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                </>
            )

        case "ATS_PLACEMENT_STARTED_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <DueDay formData={formData} />
                    <Form.Item
                        label="Subject:"
                        name="subject"
                        rules={[{ required: true}]}
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
                    <Form.Item
                        label="Message:"
                        name="message"
                        rules={[{ required: true}]}
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
            )

        case "ATS_PLACEMENT_STARTED_SEND_WEBHOOK_NOTIFICATION":
            return (
                    <>
                    <WhenAfterDays formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
                    </>
            )
        default:
            return ;
    }
};

export default PlacedCandidateHasStarted;
