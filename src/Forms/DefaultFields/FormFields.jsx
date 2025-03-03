import {Form, Input, Select, Radio, Alert} from "antd";


// Common styles for form item layout
const formItemLayout = {
    labelCol: { span: 4 },  // Adjust label width
    wrapperCol: { span: 18 }, // Adjust input field width
};

export const WhenAfterDays = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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

export const SendAsRadioButtons = ({formData, setSendAs}) => (
    <Form.Item
        label="Send as:"
        name="sendAs"
        {...formItemLayout}
        initialValue={formData?.sendAs || "default"}
    >
        <Radio.Group onChange={(e) => setSendAs(e.target.value)}>
            <Radio value="default">Default</Radio>
            <Radio value="recordOwner">Record Owner</Radio>
            <Radio value="emailSender">Email Sender</Radio>
        </Radio.Group>
    </Form.Item>
);

export const SenderSelection = ({sendAs, selectedSender, setSelectedSender, senders}) => {
    if (sendAs === "default") {
        return (
            <Form.Item label="Sender:"  {...formItemLayout} >
                <Alert message="Emails are sent from noreply@recruitly.io account." type="info"/>
            </Form.Item>
        );
    }

    if (sendAs === "recordOwner") {
        return (
            <Form.Item label="Sender:"  {...formItemLayout} >
                <Alert message="Emails are sent from record owner email account.
                Ex: If you are owner of record then emails will be sent from andy@hireoptica.com" type="info"/>
            </Form.Item>
        );
    }

    if (sendAs === "emailSender") {
        return (
            <Form.Item
                label="Sender:"
                name="emailSender"
                {...formItemLayout}
            >
                <Select
                    value={selectedSender}
                    onChange={setSelectedSender}
                    placeholder="Select Sender..."
                    style={{width: "100%"}}
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

export const WebHooks = ({webhooks, formData}) => (
    <Form.Item
        label="Webhook:"
        name="webhook"
        {...formItemLayout}
        rules={[{required: true, message: "Please select a webhook!"}]}
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


export const DaysBeforeBillingDate = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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

export const DueDate = ({formData}) => (
    <Form.Item
        label="Due Date:"
        name="dueDate"
        {...formItemLayout}
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

export const DueDay = ({formData}) => (
    <Form.Item
        label="Due Date:"
        name="dueDate"
        initialValue={formData?.dueDate ?? "0"}
        {...formItemLayout}
    >
        <Select className="form-control">
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

export const Subject = ({formData}) => (
    <Form.Item
        label="Subject:"
        name="subject"
        {...formItemLayout}
        initialValue={formData?.subject}
        rules={[{ required:true,message: "Please Enter a Subject!"}]}
    >
        <div className="input-group">
            <Input type="text" placeholder="Subject" defaultValue={formData?.subject}/>
        </div>
    </Form.Item>
);

export const Message = ({formData}) => (
    <Form.Item
        label="Message:"
        name="message"
        {...formItemLayout}
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

export const WhenApplicationIsNotProcessedFor = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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
        <div style={{color:"#667382"}}>Leaving the field blank above will send the email immediately</div>
    </Form.Item>
);

export const WhenBeforeDays = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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

export const WhenDaysBefore = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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

export const WhenJobIsOpenFor = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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

export const WhenDaysAfterOriginalRequest = ({formData}) => (
    <Form.Item
        label="When:"
        name="when"
        {...formItemLayout}
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

export const NoActivitySinceDays = ({formData}) => (
    <Form.Item
        label="No Activity:"
        name="noActivity"
        {...formItemLayout}
        initialValue={formData?.noActivity}
    >
        <div className="input-group">
            <Input
                type="number"
                title="Days After Original Request"
                addonBefore="Since"
                addonAfter="Days"
                defaultValue={formData?.noActivity}
            />
        </div>
    </Form.Item>
);

export const UserDropdown = ({users, formData}) => {
    return (
        <Form.Item
            label="User"
            name="users"
            {...formItemLayout}
        >
            <Select
                mode="multiple"
                placeholder="Select User"
                showSearch
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

export const PipelineSelect = ({selectedLead, setSelectedLead, formData}) => {
    return (
        <Form.Item
            label="Pipeline:"
            name="Pipeline"
            {...formItemLayout}
        >
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
            {...formItemLayout}
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
            {...formItemLayout}
            initialValue={formData?.LeadForm}
        >
            <Select mode="multiple" placeholder="Please Select..">
                <Select.Option value="test">test</Select.Option>
                <Select.Option value="LeadForm">LeadForm</Select.Option>
            </Select>
        </Form.Item>
    );
};
