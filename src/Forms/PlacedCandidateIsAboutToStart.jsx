import WebHooks from "./DefaultFields/WebHooks.jsx";
import WhenBeforeDays from "./DefaultFields/WhenBeforeDays.jsx";

// eslint-disable-next-line react/prop-types
const PlacedCandidateIsAboutToStart = ({ actionCode,webhooks,formData }) => {

    switch (actionCode) {
        case "ATS_PLACEMENT_ABOUT_START_SEND_WEBHOOK_NOTIFICATION":
            return (
            <>
                    <WhenBeforeDays formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />

            </>
            );
        case "ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_USER":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );
        case "ATS_PLACEMENT_ABOUT_START_ADD_CANDIDATE_TO_SEQUENCE":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );
        case "ATS_PLACEMENT_ABOUT_START_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );
        case "ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_CLIENT":
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );
        case 'ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_CANDIDATE':
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );
        case 'ATS_PLACEMENT_ABOUT_START_SEND_SMS_TO_CANDIDATE':
            return (
                <>
                    <WhenBeforeDays formData={formData} />
                </>
            );
        default:
            return ;
    }
};

export default PlacedCandidateIsAboutToStart;
