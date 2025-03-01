import {Subject, Message} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const GDPRConsentAddedByTheSystemAfterJobApplication = ({ actionCode,formData }) => {
    switch (actionCode) {
        case "SEND_EMAIL_AFTER_JOB_APPLICATION":
            return (
                <>
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default GDPRConsentAddedByTheSystemAfterJobApplication;
