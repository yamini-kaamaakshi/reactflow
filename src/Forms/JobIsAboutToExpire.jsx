import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";

// DefaultFormItem now renders an Input field with the given props
const DefaultFormItem = () => (
    <Form.Item
        label="When:"
        rules={[{ required: true, message: "Please input the number of days!" }]}
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
                addonAfter="Days Before Expire"
            />
        </div>
    </Form.Item>
);
const JobIsAboutToExpire = ({handleFormSubmit, actionCode }) => {
    const [selectedWebhook, setSelectedWebhook] = useState('');

    const handleWebhookChange = (value) => {
        setSelectedWebhook(value);
    };

    switch (actionCode) {
        case "JOB_EXPIRY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <DefaultFormItem

                        rules={[{ required: true, message: "Please input the number of days!" }]}
                        placeholder="1"
                        type="number"
                        step="1"
                        min="0"
                        max="150"
                    />

                    <Form.Item
                        label="Webhook:"
                        rules={[{ required: true, message: "Please select a webhook!" }]}
                    >
                        <Select
                            placeholder="Select Webhook"
                            value={selectedWebhook}
                            onChange={handleWebhookChange}
                            className="form-control"
                        >
                            <Select.Option value="486e9141-3c86-4f59-9dfb-8b54e747d8ab">
                                Pipedream webhook
                            </Select.Option>
                            <Select.Option value="9e92a176-a08f-4d57-8714-dbae89799b59">
                                Webhook -2 PipeDream
                            </Select.Option>
                            <Select.Option value="672809ca-8fea-4d4e-af67-e8ea16f3a06e">
                                TEST WEBHOOK
                            </Select.Option>
                            <Select.Option value="b82c68c9-acdc-419e-adcf-a0acd08b8cbc">
                                Teams - 1
                            </Select.Option>
                            <Select.Option value="4135ab04-e694-428e-bd96-502fc5a385f3">
                                teams
                            </Select.Option>
                            <Select.Option value="555b94db-f53e-48f8-8682-e2bd35a0e0cc">
                                Teams - 2
                            </Select.Option>
                            <Select.Option value="610f0153-6640-4794-8c7f-0834ac251d82">
                                Verification
                            </Select.Option>
                            <Select.Option value="a9e9358b-47db-40e6-bfcd-0e00bf6ca40d">
                                Pipe Dream
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        case "JOB_EXPIRY_SEND_EMAIL_TO_CONCERNED_USERS":
        case "JOB_EXPIRY_SEND_EMAIL_TO_OWNER": // Or condition to handle both cases
            return (
                <Form onFinish={handleFormSubmit}>
                    <DefaultFormItem
                        rules={[{ required: true, message: "Please input the number of days!" }]}
                        placeholder="1"
                        type="number"
                        step="1"
                        min="0"
                        max="150"
                    />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        default:
            return <div>No valid action found</div>;
    }
};

export default JobIsAboutToExpire;
