import {Form, Input} from "antd";

const WhenDaysBefore = ({formData }) => {
    return (
        <Form.Item
            label="When:"
            name="when"
            rules={[{ required: true, message: "Please input the number of days!" }]}
            initialValue={formData?.when}
        >
            <div className="input-group">
                <Input
                    type="number"
                    title="After Days"
                    placeholder="1"
                    addonAfter="Days Before"
                    defaultValue={formData?.when}
                />
            </div>
        </Form.Item>
    );
};

export default WhenDaysBefore