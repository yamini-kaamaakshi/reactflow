import {useState} from "react";
import {
    Message,
    PipelineSelect, SendAsRadioButtons, SenderSelection,
    Sequence,
    Subject,
    UserDropdown,
    WebHooks
} from "../DefaultFields/FormFields.jsx";


const LeadIsAddedManually = ({actionCode, webhooks, users,formData,senders}) => {
    const [selectedLead, setSelectedLead] = useState("");
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

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

        case "LEAD_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    <PipelineSelect selectedLead={selectedLead} setSelectedLead={setSelectedLead} formData={formData}/>
                    <Sequence formData={formData}/>
                </>
            );

        default:
            return null;
    }
};

export default LeadIsAddedManually;