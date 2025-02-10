import {Form, Select} from "antd";

const WebHooks = ({ webhooks,formData }) => {
    return (
        <Form.Item
            label="Webhook:"
            name="webhook"
            rules={[{ required: true, message: "Please select a webhook!" }]}
            initialValue={formData?.webhook}
        >
            <Select
                placeholder="Select Webhook"
                name="selectedWebhook"
                className="form-control"

            >

                {webhooks.map((webhook) => (
                    <Select.Option key={webhook.id} value={webhook.name}>
                        {webhook.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default WebHooks