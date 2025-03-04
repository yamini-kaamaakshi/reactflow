import {useState} from "react";
import {Form, Input, Select} from "antd";
import {
    Message,
    SendAsRadioButtons,
    SenderSelection,
    Subject,
    WebHooks,
    WhenAfterDays
} from "../DefaultFields/FormFields.jsx";


// eslint-disable-next-line react/prop-types
const PlacementIsCreated = ({actionCode, handleFormSubmit, formData, senders, webhooks}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [dueDate, setDueDate] = useState("0");

    const handleChange = (value) => {
        setDueDate(value);
    };

    switch (actionCode) {
        case "ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER":
        case 'ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_CANDIDATE':
        case 'ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_CLIENT':
            return (
                <>
                    <WhenAfterDays formData={formData}/>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData} />
                    <Message formData={formData} />
                </>
            );

        case "ATS_PLACEMENT_CREATED_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WhenAfterDays formData={formData}/>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "ATS_PLACEMENT_CREATED_ADD_TASK_CONCERNED_USERS":
        case 'ATS_PLACEMENT_CREATED_ADD_TASK_TO_OWNER':
            return (
                <Form onFinish={handleFormSubmit}>
                    <WhenAfterDays formData={formData}/>
                    <Form.Item label="Due Date:" name="dueDate">
                        <Select
                            className="form-control"
                            value={dueDate}
                            onChange={handleChange}
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
                    <Subject formData={formData} />
                    <Form.Item
                        label="Message:"
                        name="message"
                        initialValue={"Placement added for job ${jobRef}."}
                    >
                        <Input.TextArea
                            rows={5}
                            placeholder="Message"
                            style={{
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}
                        />
                    </Form.Item>
                </Form>
            );

        case "ATS_PLACEMENT_CREATED_MARK_JOB_STATUS_AS_CLOSED":
            return (
                <>
                    <WhenAfterDays formData={formData}/>
                </>
            );
        default:
            return;
    }
};

export default PlacementIsCreated;