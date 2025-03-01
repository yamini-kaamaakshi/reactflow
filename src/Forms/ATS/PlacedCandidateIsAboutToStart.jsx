import {useState} from "react";
import {Form, Input} from "antd";
import {
    WebHooks,
    WhenBeforeDays,
    Subject,
    Message,
    DueDay,
    SendAsRadioButtons,
    SenderSelection
} from "../DefaultFields/FormFields.jsx";



// eslint-disable-next-line react/prop-types
const PlacedCandidateIsAboutToStart = ({ actionCode,webhooks,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_USER":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    <Message formData={formData}/>
                </>
            );

        case "ATS_PLACEMENT_ABOUT_START_ADD_CANDIDATE_TO_SEQUENCE":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );

        case "ATS_PLACEMENT_ABOUT_START_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
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
            );

        case "ATS_PLACEMENT_ABOUT_START_SEND_WEBHOOK_NOTIFICATION":
            return (
            <>
                    <WhenBeforeDays formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />

            </>
            );

        case "ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_CLIENT":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    <Message formData={formData}/>
                </>
            );

        case 'ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_CANDIDATE':
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData}/>
                </>
            );

        case 'ATS_PLACEMENT_ABOUT_START_SEND_SMS_TO_CANDIDATE':
            return (
                <>
                    <WhenBeforeDays formData={formData} />
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
            );

        default:
            return ;
    }
};

export default PlacedCandidateIsAboutToStart;
