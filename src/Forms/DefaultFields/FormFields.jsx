import { Form, Input, Select } from "antd";
import { Radio } from "antd";
import { useState } from "react";

export const WhenAfterDays = ({ formData }) => (
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

export const WebHooks = ({ webhooks, formData }) => (
    <Form.Item
        label="Webhook:"
        name="webhook"
        rules={[{ required: true, message: "Please select a webhook!" }]}
        initialValue={formData?.webhook}
    >
        <Select placeholder="Select Webhook" name="selectedWebhook" className="form-control">
            {webhooks.map((webhook) => (
                <Select.Option key={webhook.id} value={webhook.name}>
                    {webhook.name}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
);

export const Subject = ({ formData }) => (
    <Form.Item
        label="Subject:"
        name="subject"
        rules={[{ required: true }]}
        initialValue={formData?.subject}
    >
        <div className="input-group">
            <Input type="text" placeholder="Subject" defaultValue={formData?.subject} />
        </div>
    </Form.Item>
);


export const DaysBeforeBillingDate = ({ formData }) => (
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
    )

export const DueDate = ({ formData }) => (
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
    )


export const DueDay = ({ formData }) => (
        <Form.Item label="Due Date:" name="dueDate"  rules={[{ required: true}]}
                   initialValue={formData?.dueDate}>
            <Select
                className="form-control"

            >
                <Select.Option value="0">Same Day</Select.Option>
                <Select.Option value="1">After 1 Day</Select.Option>
                <Select.Option value="2">After 2 Days</Select.Option>
                <Select.Option value="3">After 3 Days</Select.Option>
                <Select.Option value="4">After 4 Days</Select.Option>
                <Select.Option value="5">After 5 Days</Select.Option>
                <Select.Option value="7">After 1 Week</Select.Option>
                <Select.Option value="14">After 2 Weeks</Select.Option>
                <Select.Option value="30">After 1 Month</Select.Option>
            </Select>
        </Form.Item>
    );


export const Message = ({ formData }) => (
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

export const WhenApplicationIsNotProcessedFor = ({ formData }) => (
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
                    autoComplete="off"
                    step="1"
                    min="1"
                    max="1500"
                    addonBefore="Application is not processed for"
                    addonAfter="Days"
                    defaultValue={formData?.when}
                />
            </div>
        </Form.Item>
    );

export const WhenBeforeDays = ({ formData }) => (
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
                    addonBefore="Before"
                    addonAfter="Days"
                    defaultValue={formData?.when}
                />
            </div>
        </Form.Item>
    );

export const WhenDaysBefore = ({formData }) => (
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

export const WhenJobIsOpenFor = ({ formData }) => (
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
                    autoComplete="off"
                    step="1"
                    min="1"
                    max="1500"
                    addonBefore="Job is open for"
                    addonAfter="Days"
                    defaultValue={formData?.when}
                />
            </div>
        </Form.Item>
    );

export const SendAs = ({formData}) => {
    const [sendAs, setSendAs] = useState(formData?.sendAs || "DEFAULT");
    return (

        <Form.Item label="Send as:" name="sendAs">
                <Form.Item name="sendAs" initialValue="DEFAULT">
                    <Radio.Group value={sendAs} onChange={(e) => setSendAs(e.target.value)}>
                        <Radio value="DEFAULT">Default</Radio>
                        <Radio value="RECORD_OWNER">Record owner</Radio>
                        <Radio value="EMAIL_SENDER">Email Sender</Radio>
                    </Radio.Group>
                </Form.Item>
        </Form.Item>
    );
};
export const Sender = ({ sendAs }) => {
    return (
        <Form.Item label="Sender:" name="sender">
            {sendAs === "DEFAULT" && (
                <div className="default-response-email">
                    Emails are sent from <b>noreply@recruitly.io</b> account.
                </div>
            )}
            {sendAs === "RECORD_OWNER" && (
                <div className="record-owner-response-email">
                    Emails are sent from record owner email account.
                    Ex: If you are owner of record then emails will be sent from andy@hireoptica.com
                </div>
            )}
            {sendAs === "EMAIL_SENDER" && (
                <Select
                    placeholder="Select Sender"
                    className="form-control"
                >
                    <Select.Option value="0">Gary Williams 123</Select.Option>
                    <Select.Option value="1">Andy</Select.Option>
                </Select>
            )}
        </Form.Item>
    );
};

export const UserDropdown = ({ users,formData }) => {
    return (
        <Form.Item label="User" name="users">
            <Select
                mode="multiple"
                placeholder="Select User"
                showSearch
                style={{ width: "432px",marginLeft:"25px" }}
                initialValue={formData?.users}
            >
                {users
                    .sort((a, b) => a.fullName.localeCompare(b.fullName)) // Sort alphabetically
                    .map((user) => (
                        <Select.Option key={user.id} value={user.fullName}>
                            {user.fullName}
                        </Select.Option>
                    ))}
            </Select>
        </Form.Item>
    );
};

export const PipelineSelect = ({ selectedLead, setSelectedLead,formData }) => {
    return (
        <Form.Item label="Pipeline:" name="Pipeline">
            <Select
                mode="multiple"
                value={selectedLead}
                onChange={setSelectedLead}
                placeholder="Select Pipeline"
                initialValue={formData?.Pipeline}
            >
                <Select.Option value="Lead1">Lead1</Select.Option>
                <Select.Option value="hireOptica1">hireOptica1</Select.Option>
            </Select>
        </Form.Item>
    );
};

export const Sequence = ({formData}) => {
    return (
        <Form.Item
            label="Sequence:"
            name="sequence"
            rules={[{ required: true, message: "Please select a sequence!" }]}
            initialValue={formData?.sequence}
        >
            <Select mode="multiple" placeholder="Please Select..">
                <Select.Option value="test">test</Select.Option>
                <Select.Option value="hiring">hiring</Select.Option>
            </Select>
        </Form.Item>
    );
};