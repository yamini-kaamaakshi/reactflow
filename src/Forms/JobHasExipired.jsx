import {Button, Form, Select} from "antd";
import WhenAfterDays from "./DefaultFields/WhenAfterDays.jsx";
import WebHooks from "./DefaultFields/WebHooks.jsx";



// eslint-disable-next-line react/prop-types
const JoBHasExpired = ({ actionCode, handleFormSubmit, formData,rejectReasons,webhooks }) => {

    switch (actionCode) {

        case "MARK_JOB_STATUS_AS_CLOSED":
            return (
                <Form onFinish={handleFormSubmit}>
                    <WhenAfterDays formData={formData} />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )

        case "JOB_EXPIRED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <WhenAfterDays formData={formData} />
                    <WebHooks webhooks={webhooks} />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )

        case "REJECT_ALL_PENDING_APPLICANTS":

            return (
                <Form onFinish={handleFormSubmit}>
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        case "REMOVE_JOB_FROM_WEBSITE":
        case "UNPUBLISH_FROM_JOB_BOARDS":
            return (
                <Form onFinish={handleFormSubmit}>
                <WhenAfterDays formData={formData} />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            )

        default:
            return ;
    }
};

export default JoBHasExpired;
