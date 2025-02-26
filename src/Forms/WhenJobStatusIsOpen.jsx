import {Form} from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import WhenJobIsOpenFor from "./DefaultFields/WhenJobIsOpenFor.jsx";
import DueDay from "./DefaultFields/DueDay.jsx";
import Subject from "./DefaultFields/Subject.jsx";
import Message from "./DefaultFields/Message.jsx";

// eslint-disable-next-line react/prop-types
const WhenJobStatusIsOpen = ({ actionCode, formData,webhooks }) => {

    switch (actionCode) {

        case "JOB_OPEN_SEND_EMAIL_TO_OWNER":
            return (
             <>
             <WhenJobIsOpenFor formData={formData} />
             </>
            )

        case "JOB_OPEN_SEND_WEBHOOK_NOTIFICATION":
            return (
              <>
                    <WhenJobIsOpenFor formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
              </>
            )
        case "JOB_OPEN_ADD_TASK_TO_OWNER":
            return (
                <>
                    <WhenJobIsOpenFor formData={formData} />
                    <DueDay formData={formData} />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            )
        case "JOB_OPEN_MARK_JOB_STATUS_AS_CLOSED":
            return (
             <>
                    <WhenJobIsOpenFor formData={formData} />
                </>
            )

        default:
            return ;
    }
};

export default WhenJobStatusIsOpen;
