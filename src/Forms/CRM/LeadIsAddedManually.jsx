import {useEffect, useState} from "react";
import {
    Message,
    PipelineSelect, SendAsRadioButtons, SenderSelection,
    Sequence,
    Subject,
    UserDropdown,
    WebHooks
} from "../DefaultFields/FormFields.jsx";
import {Form, Select} from "antd";


const LeadIsAddedManually = ({actionCode, webhooks, users,formData,senders,emailSequences}) => {
    const [selectedLead, setSelectedLead] = useState("");
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
        case "LEAD_ADDED_MANUALLY_SEND_EMAIL_TO_LEAD":
            return (
                <>
                    <SendAsRadioButtons setSendAs={setSendAs} formData={formData}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject  formData={formData}/>
                    <Message formData={formData} />
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead} formData={formData}/>
                </>
            );

        case "LEAD_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead} formData={formData}/>
                    <SendAsRadioButtons setSendAs={setSendAs} formData={formData}/>
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

        case "LEAD_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead} formData={formData}/>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "LEAD_ADDED_MANUALLY_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAsRadioButtons setSendAs={setSendAs} formData={formData}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
                </>
            );

        default:
            return null;
    }
};

export default LeadIsAddedManually;