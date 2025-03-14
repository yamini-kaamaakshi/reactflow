import { useEffect, useState } from "react";
import {
    Message,
    SendAsRadioButtons,
    SenderSelection,
    Subject,
    UserDropdown,
    WebHooks
} from "../DefaultFields/FormFields.jsx";
import { Form, Select, Radio } from "antd";

const ContactIsAddedManually = ({ actionCode, webhooks, users, formData, senders, emailSequences, sendAsOptions, virtualPhoneOptions }) => {
    const [sendAs, setSendAs] = useState(null);
    const [selectedSender, setSelectedSender] = useState(null);
    const [sequences, setSequences] = useState([]);
    const [sendMethod, setSendMethod] = useState("sendAs");

    useEffect(() => {
        if (Array.isArray(emailSequences)) {
            setSequences(emailSequences);
        }
    }, [emailSequences]);

    const handleSendMethodChange = (e) => {
        setSendMethod(e.target.value);
    };

    return (
        <>
            {(() => {
                switch (actionCode) {
                    case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_CONTACT":
                        return (
                            <>
                                <SendAsRadioButtons setSendAs={setSendAs} formData={formData} />
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
                    case "CONTACT_ADDED_MANUALLY_ADD_TO_SEQUENCE":
                        return (
                            <>


                                <SendAsRadioButtons setSendAs={setSendAs} formData={formData} />
                                <SenderSelection
                                    sendAs={sendAs}
                                    selectedSender={selectedSender}
                                    setSelectedSender={setSelectedSender}
                                    senders={senders}
                                />
                                <Form.Item
                                    label="Sequence"
                                    name="sequence"
                                    rules={[{ required: true, message: "Please select a sequence!" }]}
                                >
                                    <Select placeholder="Please select..." onChange={(value) => setSelectedSender(value)}>
                                        {sequences.length === 1 ? (
                                            <Select.Option key={sequences[0]._id} value={sequences[0]._id}>
                                                {sequences[0].name}
                                            </Select.Option>
                                        ) : sequences.length > 1 ? (
                                            sequences.map((sequence) => (
                                                <Select.Option key={sequence._id} value={sequence._id}>
                                                    {sequence.name}
                                                </Select.Option>
                                            ))
                                        ) : (
                                            <Select.Option disabled>No data</Select.Option>
                                        )}
                                    </Select>
                                </Form.Item>

                                <h3>Send SMS From:</h3>
                                <Radio.Group onChange={handleSendMethodChange} value={sendMethod}>
                                    <Radio value="sendAs">Send As</Radio>
                                    <Radio value="virtualPhone">Virtual Phone</Radio>
                                </Radio.Group>

                                {sendMethod === "virtualPhone" && (
                                    <p style={{ color: "blue", cursor: "pointer" }}>Send from a virtual home phone number and recipients will be able to reply.</p>
                                )}

                                {sendMethod === "sendAs" && (
                                    <p style={{ background: "#f0f0f0", padding: "5px", borderRadius: "5px" }}>
                                        Recipients will see from as HireOptica and will NOT be able to reply.
                                    </p>
                                )}


                                {sendMethod === "sendAs" && (
                                    <Form.Item label="Send As" name="sendAs" initialValue={null}>                                        <Select
                                            placeholder="Select Send As"
                                            value={sendAs}
                                            onChange={(value) => setSendAs(value)}
                                        >
                                            {sendAsOptions?.length > 0 ? (
                                                sendAsOptions.map((option) => (
                                                    <Select.Option key={option._id} value={option._id}>
                                                        {option.name}
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <Select.Option disabled>No data</Select.Option>
                                            )}
                                        </Select>
                                    </Form.Item>

                                )}


                                {sendMethod === "virtualPhone" && (
                                    <Form.Item label="Virtual Phone" name="virtualPhone">
                                        <Select placeholder="Select Virtual Phone">
                                            {virtualPhoneOptions && virtualPhoneOptions.length > 0 ? (
                                                virtualPhoneOptions.map((option) => (
                                                    <Select.Option key={option.id} value={option.number}>
                                                        {option.number}
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <Select.Option disabled>No data</Select.Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                )}


                            </>
                        );
                    case "CONTACT_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
                        return <WebHooks webhooks={webhooks} formData={formData} />;
                    case "CONTACT_ADDED_MANUALLY_SEND_EMAIL_TO_SPECIFIED_USERS":
                        return (
                            <>
                                <UserDropdown users={users} formData={formData} />
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
                    default:
                        return null;
                }
            })()}
        </>
    );
};

export default ContactIsAddedManually;
