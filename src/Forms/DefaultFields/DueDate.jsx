import {Form, Input} from "antd";

const DueDate = ({ formData }) => {
    return (
        <Form.Item
            label="Due Date:"
            name="dueDate"
            rules={[{ required: true, message: "Please input the number of days!" }]}
            initialValue={formData?.dueDate}
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
                    defaultValue={formData?.dueDate}
                />
            </div>
        </Form.Item>
    );
};

export default DueDate