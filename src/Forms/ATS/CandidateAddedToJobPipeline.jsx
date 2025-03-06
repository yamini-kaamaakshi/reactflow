import {useState} from "react";
import {SendAsRadioButtons, WebHooks, Subject, Message, SenderSelection} from "../DefaultFields/FormFields.jsx";
import {Form} from "antd";
import ReactQuill from "react-quill";


// eslint-disable-next-line react/prop-types
const CandidateAddedToJobPipeline = ({ actionCode,webhooks,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [message, setMessage] = useState("");


    switch (actionCode) {
        case "ATS_CANDIDATE_ADDED_TO_PIPELINE_SEND_EMAIL":
            return (
                <>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    {/* Message Field */}
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
                <WebHooks webhooks={webhooks} formData={formData} />
            );
        default:
            return ;
    }
};

export default CandidateAddedToJobPipeline;