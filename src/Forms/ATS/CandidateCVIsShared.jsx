import {Subject,Message} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const CandidateCVIsShared = ({ actionCode,formData }) => {

    switch (actionCode) {
        case "ATS_CANDIDATE_CV_SHARED_TO_CLIENT":
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

export default CandidateCVIsShared;
