import {useState} from "react";
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
import {Form, Input} from "antd";


const LeadFormIsSubmitted = ({actionCode, webhooks, formData, users,senders}) => {
    const [selectedLead, setSelectedLead] = useState("");
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "LEAD_FORM_SUBMITTED_ADD_TASK_TO_OWNER":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
                    <DueDay formData={formData}/>
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
                    <Sequence formData={formData}/>
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