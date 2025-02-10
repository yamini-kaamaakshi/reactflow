import {Button, Form, Select} from "antd";
import WhenAfterDays from "./DefaultFields/WhenAfterDays.jsx";



// eslint-disable-next-line react/prop-types
const JoBHasExpired = ({ actionCode, handleFormSubmit, formData,rejectReasons }) => {

    switch (actionCode) {
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
                                <Select.Option key={rejectReason.id} value={rejectReason.id}>
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
        default:
            return ;
    }
};

export default JoBHasExpired;
