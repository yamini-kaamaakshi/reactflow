import {useState} from "react";
import {
    DueDate,
    LeadForm,
    Message,
    PipelineSelect,
    SendAs, Sequence,
    Subject, UserDropdown,
    WebHooks,
    WhenAfterDays
} from "../DefaultFields/FormFields.jsx";


const LeadFormIsSubmitted = ({actionCode, webhooks, formData, users}) => {
    const [selectedLead, setSelectedLead] = useState("");

    switch (actionCode) {
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
                    <SendAs/>
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

        case "LEAD_FORM_SUBMITTED_ADD_TASK_TO_OWNER":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
                    <DueDate formData={formData}/>
                </>
            );

        case "LEAD_FORM_SUBMITTED_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <LeadForm formData={formData}/>
                    <UserDropdown users={users} formData={formData}/>
                    <SendAs/>
                    <Subject/>
                    <Message/>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead}/>
                </>
            );

        default:
            return null;
    }
};

export default LeadFormIsSubmitted;