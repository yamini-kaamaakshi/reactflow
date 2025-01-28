import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const JobIsAboutToExpire = ({ handleFormSubmit, actionCode }) => {
    const [selectedWebhook, setSelectedWebhook] = useState('');

    const handleWebhookChange = (value) => {
        setSelectedWebhook(value);
    };

    switch (actionCode) {
        case "JOB_EXPIRY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <Form onFinish={handleFormSubmit}>
                    <Form.Item
                        label="When:"
                        name="steps[5475e1af-5e57-4dc8-8659-bbb1856198eb[actions][hire91d671c1f45d42608c2b7f73d6c2cce3][actionData][days]]"
                        rules={[{ required: true, message: "Please input the number of days!" }]}
                    >
                        <Input
                            title="After Days"
                            placeholder="1"
                            type="number"
                            step="1"
                            min="0"
                            max="1500"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Webhook:"
                        name="steps[14995897-bcaa-4721-8e5a-dce415932fc8[actions][hire2e3280a5b0d3470ca59d2b42dd3a8188][actionData][webhook]]"
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
        default:
            return <div>No valid action found</div>;
    }
};

export default JobIsAboutToExpire;
