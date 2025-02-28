import {Subject, Message, WhenDaysBefore} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const GDPRPrivacyConsentIsAboutToExpire = ({ actionCode,formData }) => {
    switch (actionCode) {
        case "GDPR_CHASER_EMAIL":
            return (
                <>
                    <WhenDaysBefore formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default GDPRPrivacyConsentIsAboutToExpire;
