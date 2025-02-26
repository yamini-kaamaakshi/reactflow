import Subject from "./DefaultFields/Subject.jsx";
import Message from "./DefaultFields/Message.jsx";


// eslint-disable-next-line react/prop-types
const JobStatusUpdated = ({ actionCode,formData }) => {

    switch (actionCode) {
        case "JOB_STATUS_UPDATED_SEND_EMAIL_TO_CLIENT":
            return (
                <>
                  <Subject formData={formData} />
                    <Message formData={formData} />

                </>
            )
        default:
            return ;
    }
};

export default JobStatusUpdated;
