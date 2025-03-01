import {
    Subject,
    Message,
    WhenDaysAfterOriginalRequest,
    SendAsRadioButtons,
    SenderSelection
} from "../DefaultFields/FormFields.jsx"
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const NoResponseToGDPRConsentRequestConsentProvidedBefore = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "GDPR_NO_RESPONSE_MARK_AS_DNC_AND_ARCHIVE_EXISTING":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        case "NO_RESPONSE_TO_CONSENT_REQUEST_EXISTING":
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
        case "GDPR_NO_RESPONSE_MARK_AS_DNC_EXISTING":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        case "GDPR_NO_RESPONSE_ANONYMISE_AND_ARCHIVE_EXISTING":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        case "GDPR_NO_RESPONSE_DELETE_RECORD_EXISTING":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default NoResponseToGDPRConsentRequestConsentProvidedBefore;