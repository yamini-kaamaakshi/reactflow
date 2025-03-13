import {useEffect, useState} from "react";
import {
    DueDay,
    LeadForm,
    Message,
    PipelineSelect, SendAsRadioButtons, SenderSelection,
    Sequence,
    Subject, UserDropdown,
    WebHooks,
    WhenAfterDays
} from "../DefaultFields/FormFields.jsx";
import {Form, Input, Select} from "antd";


const LeadFormIsSubmitted = ({actionCode, webhooks, formData, users,senders,emailSequences}) => {
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
        case "LEAD_FORM_SUBMITTED_ADD_TASK_TO_OWNER":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
                    <DueDay formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "LEAD_FORM_SUBMITTED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "LEAD_FORM_SUBMITTED_SEND_EMAIL_TO_LEAD":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <WhenAfterDays formData={formData}/>
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

        case "LEAD_FORM_SUBMITTED_ADD_RECORD_TO_SEQUENCE":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
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


        case "LEAD_FORM_SUBMITTED_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <UserDropdown users={users} formData={formData}/>
                    <WhenAfterDays formData={formData} />
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

export default LeadFormIsSubmitted;