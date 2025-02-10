


const generateUpdatedData = (selectedAction, values) => {
    let label;
    switch (selectedAction?.code) {
        case 'ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER':
        case 'ATS_PLACEMENT_CREATED_SEND_WEBHOOK_NOTIFICATION':
        case 'ATS_PLACEMENT_CREATED_ADD_TASK_CONCERNED_USERS':
        case 'ATS_PLACEMENT_CREATED_ADD_TASK_TO_OWNER':
        case 'REJECT_ALL_PENDING_APPLICANTS':
            label = `${selectedAction.name}\nAfter ${values?.when} Days\n`;
            break;
        case 'JOB_EXPIRY_SEND_WEBHOOK_NOTIFICATION':
        case 'JOB_EXPIRY_SEND_EMAIL_TO_CONCERNED_USERS':
        case 'JOB_EXPIRY_SEND_EMAIL_TO_OWNER':
        case 'JOB_EXPIRY_ADD_TASK_TO_OWNER':
            label = `${selectedAction.name}\n ${values?.when} Days Before expire\n`;
            break;
        default:
            label = `${selectedAction?.name}`;
            break;
    }

    return { label };
};


export default generateUpdatedData;