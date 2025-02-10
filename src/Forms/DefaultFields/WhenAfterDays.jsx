import {Form, Input} from "antd";

const WhenAfterDays = ({ formData }) => {
    return (
        <Form.Item
            label="WhenAfterDays:"
            name="when"
            rules={[{ required: true, message: "Please input the number of days!" }]}
            initialValue={formData?.when}
        >
            <div className="input-group">
                <Input
                    type="number"
                    title="After Days"
                    placeholder="1"
                    autoComplete="off"
                    step="1"
                    min="1"
                    max="1500"
                    addonBefore="After"
                    addonAfter="Days"
                    defaultValue={formData?.when}
                />
            </div>
        </Form.Item>
    );
};

export default WhenAfterDays