import {useEffect, useState} from "react";
import {Subject, DueDay, Message, WebHooks, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx"
import {Form, Select} from "antd";


// eslint-disable-next-line react/prop-types
const ACandidateAddedManually = ({actionCode, webhooks, formData,senders,emailSequences}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);
    const [sequences, setSequences] = useState([]);

    useEffect(() => {
        console.log("emailSequences data:", emailSequences);

        if (Array.isArray(emailSequences)) {
            setSequences(emailSequences);
        }
    }, [emailSequences]);

    console.log("Sequences in state:", sequences);


    switch (actionCode) {


        case "CANDIDATE_ADDED_MANUALLY_ADD_TO_SEQUENCE":
            return (
                <>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                    <Form.Item
                        label="Sequence"
                        name="sequence"
                        rules={[{ required: true, message: "Please select a sequence!" }]}
                    >
                        <Select placeholder="Please select..." onChange={(value) => setSelectedSender(value)}>
                            {sequences.length > 0 ? (
                                sequences.map((sequence) => (
                                    <Option key={sequence._id} value={sequence._id}>
                                        {sequence.name}
                                    </Option>
                                ))
                            ) : (
                                <Option disabled>No data</Option>
                            )}
                        </Select>

                    </Form.Item>
                </>
            );

        case "CANDIDATE_ADDED_MANUALLY_SEND_WEBHOOK_NOTIFICATION":
            return (
                <>
                    <WebHooks webhooks={webhooks} formData={formData}/>
                </>
            );

        case "CANDIDATE_ADDED_MANUALLY_SEND_EMAIL_REQUESTING_UPDATES":
            return (
                <>
                    <SendAsRadioButtons formData={formData} setSendAs={setSendAs}/>
                    <SenderSelection
                        sendAs={sendAs}
                        selectedSender={selectedSender}
                        setSelectedSender={setSelectedSender}
                        senders={senders}
                    />
                    <Subject formData={formData}/>
                    <Message formData={formData} />
                </>
            )

        case "CANDIDATE_ADDED_MANUALLY_ADD_TASK_TO_OWNER":
            return (
                <>
                    <DueDay formData={formData}/>
                    <Subject formData={formData}/>
                    <Message formData={formData}/>
                </>
            )
        default:
            return;
    }
};

export default ACandidateAddedManually;