import {Message, SendAsRadioButtons, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";


const LeadStatusIsUpdated = ({actionCode, users,formData}) => {
    switch (actionCode) {
        case "LEAD_STATUS_UPDATED_SEND_EMAIL_TO_LEAD":
        case "LEAD_STATUS_UPDATED_SEND_EMAIL_TO_LEAD_OWNER":
            return (
                <>
                    <SendAsRadioButtons/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "LEAD_STATUS_UPDATED_SEND_EMAIL_TO_SPECIFIED_USERS":
            return (
                <>
                    <UserDropdown users={users}/>
                    <SendAsRadioButtons/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        default:
            return null;
    }
};

export default LeadStatusIsUpdated;