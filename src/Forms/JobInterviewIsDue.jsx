import Subject from "./DefaultFields/Subject.jsx";
import Message from "./DefaultFields/Message.jsx";
import WhenDaysBefore from "./DefaultFields/WhenDaysBefore.jsx";


// eslint-disable-next-line react/prop-types
const JobInterviewIsDue = ({ actionCode,formData }) => {

    switch (actionCode) {
        case "JOB_INTERVIEW_DUE_SEND_EMAIL_TO_CLIENT":
            return (
                <>
                    <WhenDaysBefore formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />

                </>
            )
        case "JOB_INTERVIEW_DUE_SEND_SMS_TO_CANDIDATE":
            return (
                <>
                    <WhenDaysBefore formData={formData} />

                    <Message formData={formData} />

                </>
            )
        case "JOB_INTERVIEW_DUE_SEND_EMAIL_TO_CANDIDATE":
            return (
                <>
                    <WhenDaysBefore formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />

                </>
            )
        default:
            return ;
    }
};

export default JobInterviewIsDue;
