import {Subject, Message, WhenDaysAfterOriginalRequest} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const NoResponseToGDPRConsentRequestConsentProvidedBefore = ({ actionCode,formData }) => {
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
