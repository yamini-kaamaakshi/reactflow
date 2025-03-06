import {
    DaysBeforeBillingDate,
    Message,
    SendAsRadioButtons,
    SenderSelection,
    Subject
} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";
import {Form} from "antd";
import ReactQuill from "react-quill";


// eslint-disable-next-line react/prop-types
const PlacementInvoiceCreationIsDue = ({actionCode, formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [message, setMessage] = useState("");


    switch (actionCode) {
        case "SEND_INVOICE_REMINDER_EMAIL_TO_PLACEMENT_OWNER":
            return (
                <>
                    <DaysBeforeBillingDate formData={formData}/>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
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
        default:
            return;
    }
};

export default PlacementInvoiceCreationIsDue;