import {Subject, Message, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx"
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const GDPRConsentRequestIsApproved = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);4

    switch (actionCode) {
        case "SEND_EMAIL_TO_SUBJECT":
            return (
                <>
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
        default:
            return ;
    }
};


export default GDPRConsentRequestIsApproved;
