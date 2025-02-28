import {Subject, Message, WhenDaysAfterOriginalRequest} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const NoResponseToGDPRConsentRequestNewConsent = ({ actionCode,formData }) => {
    switch (actionCode) {
        case "NO_RESPONSE_TO_CONSENT_REQUEST":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );
        case "GDPR_NO_RESPONSE_ANONYMISE_AND_ARCHIVE":
            return (
                <>
                    <WhenDaysAfterOriginalRequest formData={formData} />
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
