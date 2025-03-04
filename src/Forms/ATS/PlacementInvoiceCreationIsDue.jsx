import {
    DaysBeforeBillingDate,
    Message,
    SendAsRadioButtons,
    SenderSelection,
    Subject
} from "../DefaultFields/FormFields.jsx";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const PlacementInvoiceCreationIsDue = ({actionCode, formData,senders}) => {
    const [sendAs, setSendAs] = useState("default");
    const [selectedSender, setSelectedSender] = useState(null);

    switch (actionCode) {
        case "SEND_INVOICE_REMINDER_EMAIL_TO_PLACEMENT_OWNER":
            return (
                <>
                    <DaysBeforeBillingDate formData={formData}/>
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
            );
        default:
            return;
    }
};

export default PlacementInvoiceCreationIsDue;