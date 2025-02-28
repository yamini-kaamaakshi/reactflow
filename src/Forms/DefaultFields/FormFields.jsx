import { Form, Input, Select ,Radio ,Alert } from "antd";
import ReactQuill from "react-quill";
import { useState } from "react";




// ✅ Reusable "Send As" Radio Buttons
// eslint-disable-next-line react/prop-types
export const SendAsRadioButtons = ({ formData, setSendAs }) => (
    <Form.Item
        label="Send as:"
        name="sendAs"
        initialValue={formData?.sendAs || "default"}
        rules={[{ required: true, message: "Please select a sender type" }]}
    >
        <Radio.Group onChange={(e) => setSendAs(e.target.value)}>
            <Radio value="default">Default</Radio>
            <Radio value="recordOwner">Record Owner</Radio>
            <Radio value="emailSender">Email Sender</Radio>
        </Radio.Group>
    </Form.Item>
);

// ✅ Reusable Sender Selection (Dropdown + Alerts)
// eslint-disable-next-line react/prop-types
export const SenderSelection = ({ sendAs, selectedSender, setSelectedSender, senders }) => {
    if (sendAs === "default") {
        return (
            <Form.Item label="Sender:">
                <Alert message="Emails are sent from noreply@recruitly.io account." type="info" />
            </Form.Item>
        );
    }

    if (sendAs === "recordOwner") {
        return (
            <Form.Item label="Sender:">
                <Alert message="Emails are sent from record owner email account." type="info" />
            </Form.Item>
        );
    }

    if (sendAs === "emailSender") {
        return (
            <Form.Item
                label="Sender:"
                name="emailSender"
                rules={[{ required: true, message: "Please select a sender" }]}
            >
                <Select
                    value={selectedSender}
                    onChange={setSelectedSender}
                    placeholder="Select Sender..."
                    style={{ width: "100%" }}
                >
                    {senders
                        .filter((sender) => sender.fromEmail && sender.fromName)
                        .map((sender) => (
                            <Select.Option key={sender.id} value={sender.fromEmail}>
                                {sender.fromName} - {sender.fromEmail}
                            </Select.Option>
                        ))}
                </Select>
            </Form.Item>
        );
    }

    return null;
};

// ✅ Reusable Subject Field
// eslint-disable-next-line react/prop-types
export const SubjectField = ({ formData, subject, setSubject }) => (
    <Form.Item
        label="Subject:"
        name="subject"
        rules={[{ required: true, message: "Please enter a subject" }]}
    >
        <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Subject"
        />
    </Form.Item>
);

// ✅ Reusable Message Input (ReactQuill)
// eslint-disable-next-line react/prop-types
export const MessageField = ({ formData, message, setMessage }) => (
    <Form.Item
        label="Message:"
        name="message"
        rules={[{ required: true, message: "Please enter a message" }]}
    >
        <ReactQuill
            theme="snow"
            value={message}
            onChange={setMessage}
            placeholder="Type your message here..."
        />
    </Form.Item>
);

// ✅ Reusable Due Date Dropdown
export const DueDateDropdown = ({ formData }) => (
    <Form.Item
        label="Due Date:"
        name="dueDays"
        rules={[{ required: true, message: "Please select a due date" }]}
    >
        <Select placeholder="Select Due Date">
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
export const WhenDaysAfterOriginalRequest = ({ formData }) => (
    <Form.Item
        label="When:"
        name="when"
        rules={[{ required: true, message: "Please input the number of days!" }]}
        initialValue={formData?.when}
    >
        <div className="input-group">
            <Input
                type="number"
                title="Days After Original Request"
                placeholder="7"
                addonAfter="Days After Original Request"
                defaultValue={formData?.when}
            />
        </div>
    </Form.Item>
);

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

export const LeadForm = ({formData}) => {
    return (
        <Form.Item
            label="Lead Form:"
            name="LeadForm"
            initialValue={formData?.LeadForm}
        >
            <Select mode="multiple" placeholder="Please Select..">
                <Select.Option value="test">test</Select.Option>
                <Select.Option value="LeadForm">LeadForm</Select.Option>
            </Select>
        </Form.Item>
    );
};
