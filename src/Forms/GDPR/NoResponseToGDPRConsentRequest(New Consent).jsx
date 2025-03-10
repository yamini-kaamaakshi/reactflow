import {useState} from "react";
import {
    Subject,
    Message,
    WhenDaysAfterOriginalRequest,
    SendAsRadioButtons,
    SenderSelection
} from "../DefaultFields/FormFields.jsx"
import {Form, Checkbox, Input} from "antd";


// eslint-disable-next-line react/prop-types
const NoResponseToGDPRConsentRequestNewConsent = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "NO_RESPONSE_TO_CONSENT_REQUEST":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
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
                    {/* Dropdown for "When" selection */}
                    <WhenDaysAfterOriginalRequest formData={formData} />

                    {/* Conditional Input for Consent Expiry */}
                    <Form.Item label="If Consent Expiry is less than">
                        <Input type="number" min={1} defaultValue={7} addonAfter="Days" />
                    </Form.Item>

                    {/* Toggle switch for notification */}
                    <Form.Item>
                        <Checkbox>Notify the owner after record is anonymized</Checkbox>
                    </Form.Item>
                </>
            );

        case "GDPR_NO_RESPONSE_MARK_AS_DNC":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        case "GDPR_NO_RESPONSE_MARK_AS_DNC_AND_ARCHIVE":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        case "GDPR_NO_RESPONSE_DELETE_RECORD":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default NoResponseToGDPRConsentRequestNewConsent;