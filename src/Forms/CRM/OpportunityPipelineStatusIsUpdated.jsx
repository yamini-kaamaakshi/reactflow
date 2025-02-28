import {Message, SendAsRadioButtons, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";

const OpportunityPipelineStatusIsUpdated = ({actionCode, users,formData}) => {
    switch (actionCode) {

        case "OPPORTUNITY_STATUS_UPDATED_SEND_EMAIL_TO_OPPORTUNITY":
        case "OPPORTUNITY_STATUS_UPDATED_SEND_EMAIL_TO_OPPORTUNITY_OWNER":
            return (
                <>
                    <SendAsRadioButtons/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "OPPORTUNITY_STATUS_UPDATED_SEND_EMAIL_TO_SPECIFIED_USERS":
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

export default OpportunityPipelineStatusIsUpdated;