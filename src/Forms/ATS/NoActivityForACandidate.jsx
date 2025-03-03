import {useState} from "react";
import {
    Subject,
    Message,
    SendAsRadioButtons,
    SenderSelection,
    NoActivitySinceDays, WebHooks, DueDay
} from "../DefaultFields/FormFields.jsx";
import {Form, Input} from "antd";


// eslint-disable-next-line react/prop-types
const NoActivityForACandidate = ({ actionCode,formData,senders,webhooks}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "NO_ACTIVITY_SEND_EMAIL_TO_CANDIDATE_REQUESTING_UPDATES":
            return (
                <>
                    <NoActivitySinceDays formData={formData} />s
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
            );
        case "NO_ACTIVITY_CANDIDATE_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <NoActivitySinceDays formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
                </>
            );
        case "NO_ACTIVITY_CANDIDATE_ADD_TASK_TO_OWNER":
            return (
                <>
                    <NoActivitySinceDays formData={formData} />
                    <DueDay formData={formData} />
                    <Form.Item
                        label="Subject:"
                        name="subject"
                        rules={[{required: true}]}
                        initialValue={formData?.subject}
                    >
                        <div className="input-group">
                            <Input type="text" placeholder="Subject" defaultValue={formData?.subject}/>
                        </div>
                    </Form.Item>
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
        default:
            return ;
    }
};

export default NoActivityForACandidate;