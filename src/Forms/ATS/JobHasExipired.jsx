import {Form, Select} from "antd";
import {WhenAfterDays,WebHooks,DueDay,Subject,Message} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const JoBHasExpired = ({ actionCode, formData,rejectReasons,webhooks }) => {
    switch (actionCode) {
        case "JOB_EXPIRED_ADD_TASK_TO_OWNER":
            return (
                <>
                <DueDay formData={formData} />
                <Subject formData={formData} />
                <Message formData={formData} />
                </>
            )

        case "MARK_JOB_STATUS_AS_CLOSED":
            return (
                <WhenAfterDays formData={formData} />
            )

        case "JOB_EXPIRED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <WebHooks webhooks={webhooks} />
                </>
            )

        case "REJECT_ALL_PENDING_APPLICANTS":

            return (
                <>
                    <WhenAfterDays formData={formData} />
                    <Form.Item
                        label="Reason:"
                        name="reason"
                        rules={[{ required: true, message: "Please select" }]}
                    >
                        <Select
                            placeholder="Please select..."
                            name="selectedreasons"
                            className="form-control"
                        >

                            {rejectReasons?.map((rejectReason) => (
                                <Select.Option key={rejectReason.id} value={rejectReason.name}>
                                    {rejectReason.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </>
            );

        case "REMOVE_JOB_FROM_WEBSITE":
        case "UNPUBLISH_FROM_JOB_BOARDS":
            return (
                <WhenAfterDays formData={formData} />
            )
        default:
            return ;
    }
};

export default JoBHasExpired;