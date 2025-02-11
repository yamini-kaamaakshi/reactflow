import {Form} from "antd";
import WebHooks from "./DefaultFields/WebHooks.jsx";
import WhenJobIsOpenFor from "./DefaultFields/WhenJobIsOpenFor.jsx";

// eslint-disable-next-line react/prop-types
const WhenJobStatusIsOpen = ({ actionCode, handleFormSubmit, formData,webhooks }) => {

    switch (actionCode) {

        case "JOB_OPEN_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <WhenJobIsOpenFor formData={formData} />
                    <WebHooks webhooks={webhooks} formData={formData} />
                </Form>
            )

        case "JOB_OPEN_MARK_JOB_STATUS_AS_CLOSED":
            return (
                <Form onFinish={handleFormSubmit}>
                    <WhenJobIsOpenFor formData={formData} />
                </Form>
            )
        default:
            return ;
    }
};

export default WhenJobStatusIsOpen;
