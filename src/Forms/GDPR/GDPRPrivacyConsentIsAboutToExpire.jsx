import {useState} from "react";
import {Subject, Message, WhenDaysBefore, SendAsRadioButtons, SenderSelection} from "../DefaultFields/FormFields.jsx"


// eslint-disable-next-line react/prop-types
const GDPRPrivacyConsentIsAboutToExpire = ({ actionCode,formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "GDPR_CHASER_EMAIL":
            return (
                <>
                    <WhenDaysBefore formData={formData} />
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

export default GDPRPrivacyConsentIsAboutToExpire;