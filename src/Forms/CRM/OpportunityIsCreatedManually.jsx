import {Message, SendAsRadioButtons, Subject, UserDropdown} from "../DefaultFields/FormFields.jsx";


const OpportunityIsCreatedManually = ({actionCode, users,formData}) => {
    switch (actionCode) {
        case "OPPORTUNITY_CREATED_SEND_EMAIL_TO_OPPORTUNITY_CONTACT":
        case "OPPORTUNITY_CREATED_SEND_EMAIL_TO_OPPORTUNITY_OWNER":
            return (
                <>
                    <SendAsRadioButtons/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            );

        case "OPPORTUNITY_CREATED_SEND_EMAIL_TO_SPECIFIED_USERS":
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

export default OpportunityIsCreatedManually;