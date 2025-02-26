import {Form, Input} from "antd";

const DaysBeforeBillingDate = ({ formData }) => {
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
                    title="Before Days"
                    placeholder="1"
                    autoComplete="off"
                    step="1"
                    min="1"
                    max="1500"
                    addonAfter="Days Before Billing Date"
                    defaultValue={formData?.when}
                />
            </div>
        </Form.Item>
    );
};

export default DaysBeforeBillingDate