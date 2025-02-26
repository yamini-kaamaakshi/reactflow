import {Form} from "antd";
import WhenAfterDays from "./DefaultFields/WhenAfterDays.jsx";
import WebHooks from "./DefaultFields/WebHooks.jsx";


// eslint-disable-next-line react/prop-types
const PlacedCandidateHasStarted = ({ actionCode, handleFormSubmit,webhooks,formData }) => {

    switch (actionCode) {
        case "ATS_PLACEMENT_STARTED_SEND_WEBHOOK_NOTIFICATION":
            return (
      <>
                  <WhenAfterDays formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />

      </>
            )
        default:
            return ;
    }
};

export default PlacedCandidateHasStarted;
