import WhenBeforeDays from "./DefaultFields/WhenBeforeDays.jsx";

// eslint-disable-next-line react/prop-types
const WhenAPlacementIsNearingItsEndDate = ({ actionCode,formData }) => {

    switch (actionCode) {
        case "ATS_PLACEMENT_ABOUT_END_SEND_EMAIL_TO_USER":
            return (

                <WhenBeforeDays formData = {formData} />

            );
        default:
            return ;
    }
};

export default WhenAPlacementIsNearingItsEndDate;
