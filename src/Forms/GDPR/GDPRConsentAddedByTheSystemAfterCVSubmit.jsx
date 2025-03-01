import {Subject, Message, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx"
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const GDPRConsentAddedByTheSystemAfterCVSubmit = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "SEND_EMAIL_AFTER_CV_SUBMIT":
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
        case "SEND_PORTAL_ACTIVATION_EMAIL_AFTER_CV_SUBMIT":
            return (
                <>
                </>
            );
        default:
            return ;
    }
};

export default GDPRConsentAddedByTheSystemAfterCVSubmit;
