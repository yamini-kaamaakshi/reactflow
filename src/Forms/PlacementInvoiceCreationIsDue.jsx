import DaysBeforeBillingDate from "./DefaultFields/DaysBeforeBillingDate.jsx";


// eslint-disable-next-line react/prop-types
const PlacementInvoiceCreationIsDue = ({ actionCode,formData }) => {

    switch (actionCode) {
        case "SEND_INVOICE_REMINDER_EMAIL_TO_PLACEMENT_OWNER":
            return (

                <DaysBeforeBillingDate formData = {formData} />
            );
        default:
            return ;
    }
};

export default PlacementInvoiceCreationIsDue;
