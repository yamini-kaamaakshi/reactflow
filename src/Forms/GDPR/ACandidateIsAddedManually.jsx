import {Subject, Message, DueDay} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const ACandidateIsAddedManually = ({ actionCode,formData }) => {
    switch (actionCode) {
        case "SEND_GDPR_CONSENT_FOR_MANUALLY_ADDED":
            return (
                <>
                <Subject formData={formData} />
                <Message formData={formData} />
                </>
            );
        case "ADD_TASK_TO_OWNER":
            return (
                <>
                    <DueDay formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default ACandidateIsAddedManually;
