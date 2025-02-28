


const generateUpdatedData = (selectedAction, values) => {
    let label;
    switch (selectedAction?.code) {
        case 'ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER':
        case 'ATS_PLACEMENT_CREATED_SEND_WEBHOOK_NOTIFICATION':
        case 'ATS_PLACEMENT_CREATED_ADD_TASK_CONCERNED_USERS':
        case 'ATS_PLACEMENT_CREATED_ADD_TASK_TO_OWNER':
        case 'REJECT_ALL_PENDING_APPLICANTS':
        case 'REMOVE_JOB_FROM_WEBSITE':
        case 'UNPUBLISH_FROM_JOB_BOARDS':
        case 'MARK_JOB_STATUS_AS_CLOSED':
        case 'JOB_EXPIRED_SEND_WEBHOOK_NOTIFICATION':
        case 'JOB_APPLICATION_RECEIVED_ADD_TASK_TO_OWNER':
        case 'ATS_PLACEMENT_STARTED_SEND_WEBHOOK_NOTIFICATION':
            label = `${selectedAction.name}\nAfter ${values?.when} Days\n`;
            break;
        case 'JOB_EXPIRY_SEND_WEBHOOK_NOTIFICATION':
        case 'JOB_EXPIRY_SEND_EMAIL_TO_CONCERNED_USERS':
        case 'JOB_EXPIRY_SEND_EMAIL_TO_OWNER':
        case 'JOB_EXPIRY_ADD_TASK_TO_OWNER':
            label = `${selectedAction.name}\n ${values?.when} Days Before expire\n`;
            break;
        case 'JOB_OPEN_SEND_WEBHOOK_NOTIFICATION':
        case 'JOB_OPEN_MARK_JOB_STATUS_AS_CLOSED':
        case "JOB_OPEN_ADD_TASK_TO_OWNER":
        case "JOB_OPEN_SEND_EMAIL_TO_OWNER":
            label = `${selectedAction.name}\nJob is open for ${values?.when} Days\n`;
            break;
        case 'JOB_ADDED_ADD_TASK_TO_OWNER':
            label = `${selectedAction.name}\n ${values?.dueDate} Days Before expire\n`;
            break;
        case "ATS_PLACEMENT_ABOUT_START_SEND_WEBHOOK_NOTIFICATION":
        case "ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_USER":
        case "ATS_PLACEMENT_ABOUT_START_ADD_CANDIDATE_TO_SEQUENCE":
        case "ATS_PLACEMENT_ABOUT_START_ADD_TASK_TO_OWNER":
        case "ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_CLIENT":
        case 'ATS_PLACEMENT_ABOUT_START_SEND_EMAIL_TO_CANDIDATE':
        case 'ATS_PLACEMENT_ABOUT_START_SEND_SMS_TO_CANDIDATE':
            label = `${selectedAction.name}\nBefore ${values?.when} Days Before Billing Date\n`;
            break;
        case "SEND_INVOICE_REMINDER_EMAIL_TO_PLACEMENT_OWNER":
            label = `${selectedAction.name}\n${values?.when} Days\n`;
            break;
        case "JOB_INTERVIEW_DUE_SEND_EMAIL_TO_CLIENT":
            label = `${selectedAction.name}\n${values?.when} Days Before\n`;
            break;
        default:
            label = `${selectedAction?.name}`;
            break;
    }

    return { label };
};


export default generateUpdatedData;