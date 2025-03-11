import { useState } from "react";
import { Subject, Message, When, SendAsRadioButtons, SenderSelection } from "../DefaultFields/FormFields.jsx";
import { Switch } from "antd";

// eslint-disable-next-line react/prop-types
const GDPRConsentRequestIsRejected = ({ actionCode, formData, senders }) => {
    const [notifyOwner, setNotifyOwner] = useState(false);
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    const handleCheckboxChange = (checked) => {
        setNotifyOwner(checked);

        // Fetch the existing savedActionData
        let savedActionData = JSON.parse(localStorage.getItem("savedActionData")) || [];

        savedActionData = savedActionData.map(action => {
            if (action?.selectedAction?._id === actionCode) {
                return { ...action, notifyOwner: checked }; // Update notifyOwner value
            }
            return action;
        });

        // Save updated data to localStorage
        localStorage.setItem("savedActionData", JSON.stringify(savedActionData));

        console.log("Updated savedActionData:", JSON.parse(localStorage.getItem("savedActionData"))); // Debugging
    };

    const renderToggle = (label) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "10px 0 16px 0" }}>
            <Switch checked={notifyOwner} onChange={handleCheckboxChange} />
            <span>{label}</span>
        </div>
    );

    switch (actionCode) {
        case "MARK_AS_DNC_AND_ARCHIVE":
            return (
                <>
                    <p><strong>Mark as DNC and Archive</strong></p>
                    <p>The contact will be marked as Do Not Contact (DNC) and archived.</p>
                    {renderToggle("Notify the owner after record is archived")}
                    <p>RecruitlyBot - Marked as DNC and Archived as GDPR consent is rejected.</p>
                </>
            );

        case "DELETE_RECORD":
            return (
                <>
                    <When formData={formData} />
                    <p><strong>Delete Record</strong></p>
                    <p>This action will permanently delete the record. This cannot be undone.</p>
                    {renderToggle("Notify the owner after record is deleted")}
                    <p>RecruitlyBot - Deleted candidate/contact as GDPR consent is rejected.</p>
                </>
            );

        case "MARK_AS_DNC":
            return (
                <>
                    <p><strong>Mark as Do Not Contact (DNC)</strong></p>
                    <p>The contact will no longer receive communication.</p>
                    {renderToggle("Notify the owner after record is marked as DNC")}
                    <p>RecruitlyBot - Marked as DNC as GDPR consent is rejected.</p>
                </>
            );

        case "ANONYMISE_AND_ARCHIVE":
            return (
                <>
                    <p><strong>Anonymise and Archive</strong></p>
                    <p>The contact's data will be anonymised and archived.</p>
                    {renderToggle("Notify the owner after record is anonymised and archived")}
                    <p>RecruitlyBot - Anonymised candidate/contact as GDPR consent is rejected.</p>
                </>
            );

        case "SEND_NOTIFICATION_EMAIL_TO_OWNER":
            return (
                <>
                    <p><strong>Send Notification Email to Owner</strong></p>
                    <Subject formData={formData} />
                    <Message formData={formData} />
                    <p>RecruitlyBot - Notification email sent to owner.</p>
                </>
            );

        case "SEND_CONSENT_REJECT_EMAIL_TO_SUBJECT":
            return (
                <>
                    <SendAsRadioButtons setSendAs={setSendAs} formData={formData} />
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <p><strong>Send Consent Rejection Email</strong></p>
                    <Subject formData={formData} />
                    <Message formData={formData} />
                    <p>RecruitlyBot - Consent rejection email sent to subject.</p>
                </>
            );

        default:
            return null;
    }
};

export default GDPRConsentRequestIsRejected;
