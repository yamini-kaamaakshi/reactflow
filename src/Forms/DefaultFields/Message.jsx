import {Form, Input} from "antd";

const Message = ({ formData }) => {
    return (
            <Form.Item
                label="Message:"
                name="message"
                rules={[{ required: true}]}
                initialValue={formData?.message}
            >
                <div className="input-group">
                    <Input.TextArea
                        rows={5}
                        placeholder="Message"
                        style={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        }}
                    />
                </div>
            </Form.Item>
    );
};

export default Message;