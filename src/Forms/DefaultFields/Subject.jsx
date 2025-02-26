import {Form, Input} from "antd";

const Subject = ({ formData }) => {
    return (
        <Form.Item
            label="Subject:"
            name="subject"
            rules={[{ required: true}]}
            initialValue={formData?.subject}
        >
            <div className="input-group">
                <Input
                    type="text"
                    placeholder="Subject"
                    defaultValue={formData?.subject}
                />
            </div>
        </Form.Item>
    );
};

export default Subject;