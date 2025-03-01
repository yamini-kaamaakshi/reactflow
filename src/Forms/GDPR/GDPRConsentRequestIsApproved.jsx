import {Subject, Message} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const GDPRConsentRequestIsApproved = ({ actionCode,formData }) => {
    switch (actionCode) {
        case "SEND_EMAIL_TO_SUBJECT":
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

export default GDPRConsentRequestIsApproved;
