import { useState } from "react";
import {
    Subject,
    Message,
    WhenDaysAfterOriginalRequest,
    SendAsRadioButtons,
    SenderSelection
} from "../DefaultFields/FormFields.jsx";
import { Form, Input, Switch } from "antd";

// eslint-disable-next-line react/prop-types
const NoResponseToGDPRConsentRequestNewConsent = ({ actionCode, formData, senders }) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [notifyOwner, setNotifyOwner] = useState(false);

    const handleCheckboxChange = (checked) => {
        setNotifyOwner(checked);
    };

    switch (actionCode) {
        case "NO_RESPONSE_TO_CONSENT_REQUEST":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
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

        case "GDPR_NO_RESPONSE_ANONYMISE_AND_ARCHIVE":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                    <Form.Item label="If Consent Expiry is less than">
                        <Input type="number" min={1} defaultValue={7} addonAfter="Days" />
                    </Form.Item>
                    <Form.Item>
                        <Switch checked={notifyOwner} onChange={handleCheckboxChange} style={{ marginRight: 8 }} />
                        <span>Notify the owner after record is anonymized</span>
                    </Form.Item>
                    <p>RecruitlyBot - Anonymised contact/candidate as there was no response to GDPR consent.</p>
                </>
            );

        case "GDPR_NO_RESPONSE_MARK_AS_DNC":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                    <Form.Item label="If Consent Expiry is less than">
                        <Input type="number" min={1} defaultValue={7} addonAfter="Days" />
                    </Form.Item>
                    <Form.Item>
                        <Switch checked={notifyOwner} onChange={handleCheckboxChange} style={{ marginRight: 8 }} />
                        <span>Notify the owner after record is marked as DNC</span>
                    </Form.Item>
                    <p>RecruitlyBot - Marked as DNC as there was no response to GDPR consent.</p>
                </>
            );

        case "GDPR_NO_RESPONSE_MARK_AS_DNC_AND_ARCHIVE":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                    <Form.Item>
                        <Switch checked={notifyOwner} onChange={handleCheckboxChange} style={{ marginRight: 8 }} />
                        <span>Notify the owner after record is archived</span>
                    </Form.Item>
                    <p>RecruitlyBot - Marked as DNC and Archived as there was no response to GDPR consent.</p>
                </>
            );

        case "GDPR_NO_RESPONSE_DELETE_RECORD":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                    <Form.Item>
                        <Switch checked={notifyOwner} onChange={handleCheckboxChange} style={{ marginRight: 8 }} />
                        <span>Notify the owner after record is deleted</span>
                    </Form.Item>
                    <p>RecruitlyBot - Deleted contact/candidate as there was no response to GDPR consent.</p>
                </>
            );

        default:
            return null;
    }
};

export default NoResponseToGDPRConsentRequestNewConsent;
