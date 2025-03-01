import {Subject, Message} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const GDPRConsentAddedByTheSystemAfterCVSubmit = ({ actionCode,formData }) => {
    switch (actionCode) {
        case "SEND_EMAIL_AFTER_CV_SUBMIT":
            return (
                <>
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );
        case "SEND_PORTAL_ACTIVATION_EMAIL_AFTER_CV_SUBMIT":
            return (
                <>
                </>
            );
        default:
            return ;
    }
};

export default GDPRConsentAddedByTheSystemAfterCVSubmit;
