import  { useEffect, useState } from "react";
import ReactFlow, {Background} from "react-flow-renderer";
import {Button, Drawer, Form, Segmented, Spin} from "antd";
import { Card, Flex } from "antd";
import { IoIosFlash } from "react-icons/io";
import { GrTrigger } from "react-icons/gr";
import { SaveOutlined } from "@ant-design/icons";

import AddTriggerNode from "./AddTriggerNode.jsx";
import AddActionNode  from "./AddActionNode.jsx";
import FilterIcon from "../Custom/FilterIcon.jsx";
import AddActionButton from "../Custom/AddActionButton.jsx";
import generateUpdatedData from "../swichcaseManager/ActionDisplay.jsx";
import JobIsAboutToExpire from "../Forms/ATS/JobIsAboutToExpire.jsx";
import PlacementIsCreated from "../Forms/ATS/PlacementIsCreated.jsx";
import JoBHasExpired from "../Forms/ATS/JobHasExpired.jsx";
import JobIsAddedToTheSystem from "../Forms/ATS/JobIsAddedToTheSystem.jsx";
import JobApplicationIsNotReviewed from "../Forms/ATS/JobApplicationIsNotReviewed.jsx";
import PlacedCandidateHasStarted from "../Forms/ATS/PlacedCandidateHasStarted.jsx";
import PlacedCandidateIsAboutToStart from "../Forms/ATS/PlacedCandidateIsAboutToStart.jsx";
import CandidateAddedToJobPipeline from "../Forms/ATS/CandidateAddedToJobPipeline.jsx"
import PlacementInvoiceCreationIsDue from "../Forms/ATS/PlacementInvoiceCreationIsDue.jsx";
import WhenAPlacementIsNearingItsEndDate from "../Forms/ATS/WhenAPlacementIsNearingItsEndDate.jsx";
import JobInterviewIsDue from "../Forms/ATS/JobInterviewIsDue.jsx";
import candidateCVIsShared from "../Forms/ATS/CandidateCVIsShared.jsx";
import ContactIsAddedManually from "../Forms/CRM/ContactIsAddedManually.jsx";
import ContactStatusIsUpdated from "../Forms/CRM/ContactStatusIsUpdated.jsx";
import LeadIsAddedManually from "../Forms/CRM/LeadIsAddedManually.jsx";
import LeadStatusIsUpdated from "../Forms/CRM/LeadStatusIsUpdated.jsx";
import OpportunityPipelineStatusIsUpdated from "../Forms/CRM/OpportunityPipelineStatusIsUpdated.jsx";
import OpportunityIsCreatedManually from "../Forms/CRM/OpportunityIsCreatedManually.jsx";
import LeadFormIsSubmitted from "../Forms/CRM/LeadFormIsSubmitted.jsx";
import ACandidateIsAddedManually from "../Forms/GDPR/ACandidateIsAddedManually.jsx";
import GDPRConsentRequestIsRejected from "../Forms/GDPR/GDPRConsentRequestIsRejected.jsx";
import NoResponseToGDPRConsentRequestNewConsent from "../Forms/GDPR/NoResponseToGDPRConsentRequest(New Consent).jsx";
import GDPRPrivacyConsentIsAboutToExpire from "../Forms/GDPR/GDPRPrivacyConsentIsAboutToExpire.jsx";
import NoResponseToGDPRConsentRequestConsentProvidedBefore
    from "../Forms/GDPR/NoResponseToGDPRConsentRequest(Consent Provided before).jsx";
import GDPRConsentAddedByTheSystemAfterCVSubmit from "../Forms/GDPR/GDPRConsentAddedByTheSystemAfterCVSubmit.jsx";
import GDPRConsentAddedByTheSystemAfterJobApplication
    from "../Forms/GDPR/GDPRConsentAddedByTheSystemAfterJobApplication.jsx";
import GDPRConsentRequestIsApproved from "../Forms/GDPR/GDPRConsentRequestIsApproved.jsx";
import ACandidateAddedManually from "../Forms/ATS/ACandidateAddedManually.jsx";
import NoActivityForACandidate from "../Forms/ATS/NoActivityForACandidate.jsx";
import JobStatusOpen from "../Forms/ATS/JobStatusOpen.jsx";
import JobStatusUpdate from "../Forms/ATS/JobStatusUpdate.jsx";
import PipelineStatusUpdate from "../Forms/ATS/PipelineStatusUpdate.jsx";


const initialEdges = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: false,
        type: "custom",
    },
];
const initialNodes = [
    {
        id: "1",
        type: "addTrigger",
        data: {label: "Add Trigger"},
        position: {x: 100, y: 200},
    },
    {
        id: "2",
        type: "addAction",
        data: {
            label:
                "Add a trigger to start building",
        },
        position: {x: 100, y: 350},
    },
];

// eslint-disable-next-line react/prop-types
const WorkFlow = ({apiServer, apiKey}) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [, setSelectedNode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [triggers, setTriggers] = useState([]);
    const [formDrawerVisible, setFormDrawerVisible] = useState(false); // For the Form Drawer
    const [actionDrawerVisible, setActionDrawerVisible] = useState(false); // For Action Drawer
    const [, setSelectedBlock] = useState(null);
    const [selectedActions, setSelectedActions] = useState([]);
    const [selectedTriggerName, setSelectedTriggerName] = useState(null);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
    const [formData, setFormData] = useState({});

    // Reset functions
    const resetSelectedAction = () => setSelectedAction(null);
    const resetFormData = () => setFormData({});
    const resetAll = () => {
        setSelectedTriggerName(null);
        setSelectedAction(null);
        setFormData({});
    };


    const [nodes, setNodes] = useState(() => {
        const savedNodes = localStorage.getItem('nodes');
        return savedNodes ? JSON.parse(savedNodes) : initialNodes
    });

    const [edges, setEdges] = useState(() => {
        const savedEdges = localStorage.getItem('edges');
        return savedEdges ? JSON.parse(savedEdges) : initialEdges;
    });
    useEffect(() => {

        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
    }, [nodes, edges]);

    const handleSaveTrigger = () => {
        let workflowData = JSON.parse(localStorage.getItem("workflowData")) || { steps: {} };
        const selectedTrigger = JSON.parse(localStorage.getItem("selectedTrigger")) || null;
        const triggerId = selectedTrigger?._id || null;

        workflowData.steps = {}; // Clear previous triggers before saving the new one

        // Re-fetch saved actions from localStorage
        let savedActionData = JSON.parse(localStorage.getItem("savedActionData")) || [];

        console.log("Before processing savedActionData:", savedActionData);

        savedActionData = savedActionData.filter(action => action?.selectedAction?._id);

        const actions = savedActionData.reduce((acc, action) => {
            const actionId = action?.selectedAction?._id;
            if (actionId) {
                acc[actionId] = {
                    actionData: action.formData || {},
                    notifyOwner: action.notifyOwner || false, // Ensure correct notifyOwner value is saved
                };
            }
            return acc;
        }, {});

        console.log("Processed actions object:", actions); // Debugging

        if (selectedTrigger) {
            workflowData.steps[triggerId] = {
                ...selectedTrigger,
                actions: actions
            };
        }

        localStorage.setItem("workflowData", JSON.stringify(workflowData));

        console.log("Updated workflowData:", JSON.parse(localStorage.getItem("workflowData"))); // Debugging
    };


    const [emailSequences, setEmailSequences] = useState([]);

    const [selectFilter, setSelectFilter] = useState("All");
    const [, setDroppedItem] = useState(null);
    const [iconVisible, setIconVisible] = useState(!!selectedTriggerName);
    const [, setIsFirstNodeUsed] = useState(false);
    const [nodeCounter, setNodeCounter] = useState(nodes.length);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [editDrawerVisible, setEditDrawerVisible] = useState(false);
    const [selectedActionData, setSelectedActionData] = useState(null); // Add this state if not already defined
    const [actions, setActions] = useState([]);
    const [triggerCode, setTriggerCode] = useState(null);
    const [actionCode, setActionCode] = useState(null);

    const [jobTypes, setJobTypes] = useState([]);
    const [tags, setTags] = useState([]);
    const [candidateStatus, setCandidateStatus] = useState([]);
    const [source, setSource] = useState([]);
    const [jobStatus, setJobStatus] = useState([]);
    const [users, setUsers] = useState([])
    const [webhooks, setWebhooks] = useState([])
    const [rejectReasons, setRejectReasons] = useState([])
    const [senders, setSenders] = useState([])
    const [pipelineStatuses, setPipelineStatuses] = useState([]);
    const jobStatuses = pipelineStatuses?.map((status) => status.statusName) || [];

    useEffect(() => {
        if (selectedActionData?.selectedAction) {
            setSelectedAction(selectedActionData.selectedAction);
        }
    }, [selectedActionData]);
    useEffect(() => {
        const savedActionData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const actionToEdit = savedActionData.find(action => action.node.id === selectedNodeId);
        if (actionToEdit) {
            setSelectedActionData(actionToEdit);
        }
    }, [selectedNodeId]);


    useEffect(() => {
        if (selectedNodeId) {
            localStorage.setItem("selectedNodeId", selectedNodeId);
        }
    }, [selectedNodeId]);
    // Load selectedNodeId from localStorage when the component mounts
    useEffect(() => {
        const savedNodeId = localStorage.getItem("selectedNodeId");
        if (savedNodeId) {
            setSelectedNodeId(savedNodeId);
        }
    }, []);

    useEffect(() => {
        // Retrieve stored trigger data from localStorage
        const savedTrigger = localStorage.getItem("droppedTrigger");
        const storedTriggerName = localStorage.getItem("selectedTriggerName");

        if (savedTrigger) {
            const parsedTrigger = JSON.parse(savedTrigger);
            setSelectedTriggerName(parsedTrigger.name);
            setDroppedItem(parsedTrigger.name);
        } else if (storedTriggerName) {
            setSelectedTriggerName(storedTriggerName);
        }

    }, []);
    useEffect(() => {
        fetchTriggers();
    }, []);



    useEffect(() => {
        const savedTriggerCode = localStorage.getItem('triggerCode'); // Retrieve triggerCode from localStorage
        if (savedTriggerCode) {
            setTriggerCode(savedTriggerCode);
            fetchActions(savedTriggerCode);
        }

    }, []);
    useEffect(() => {
        if (triggerCode) {
            fetchJobTypes();
            fetchTags();
            fetchCandidateStatus();
            fetchSource();
            fetchJobStatus();
            fetchUsers();

        }
    }, [triggerCode]);

    useEffect(() => {
        if (triggerCode === "PIPELINE_STATUS_UPDATE") {
            fetchJobPipelineData();
        }
    }, [triggerCode]);

    useEffect(() => {
        if(actionCode){
            fetchWebhooks();
            fetchRejectReasons();
            fetchSenders();
        }
    }, [actionCode]);







    useEffect(() => {
        fetchData(`${apiServer}/api/masterdata/job_pipeline`, (data) => {
            console.log("API Response - Job Pipeline Data:", data);

            setPipelineStatuses(data);
        });
    }, []);







    const fetchTriggers = () =>
        fetchData(`${apiServer}/api/lookup_automation/triggers`, setTriggers);


    const fetchActions = (triggerCode) => {
        console.log(`Fetching actions for triggerCode: ${triggerCode}`);

        fetchData(`${apiServer}/api/lookup_automation/actions?triggerCode=${triggerCode}`, (data) => {
            console.log("API Response - Actions Data:", data);
            setActions(data);
        });
    };
    const fetchJobTypes = () =>
        fetchData(`${apiServer}/api/masterdata/jobTypes`, setJobTypes);



    const fetchData = async (url, setter) => {
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(`Fetched data from ${url}:`, result);

            setter(result?.data || []);
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        } finally {
            setIsLoading(false);
        }
    };



    const fetchEmailSequences = () =>
        fetchData(`${apiServer}/api/masterdata/emailsequences?type=CANDIDATE`, setEmailSequences);



    useEffect(() => {
        console.log("🚀 Fetching email sequences...");
        fetchEmailSequences();
    }, []);

    useEffect(() => {
        console.log("🔄 Updated emailSequences:", emailSequences);
    }, [emailSequences]);




    const fetchTags = () =>
        fetchData(`${apiServer}/api/masterdata/tags/v2`, setTags);

    const fetchCandidateStatus = () =>
        fetchData(`${apiServer}/api/masterdata/candidatestatus`, setCandidateStatus);


    const fetchSource = () =>
        fetchData(`${apiServer}/api/masterdata/source`, setSource);

    const fetchJobStatus = () => {
        fetchData(`${apiServer}/api/masterdata/jobstatus`, (data) => {
            setJobStatus(data);
        });
    };

    const fetchUsers = () =>
        fetchData(`${apiServer}/api/user_list`, setUsers);

    const fetchWebhooks = () =>
        fetchData(`${apiServer}/api/masterdata/webhooks`, setWebhooks);

    const fetchRejectReasons = () =>
        fetchData(`${apiServer}/api/masterdata/job_pipeline/reject_reasons`, setRejectReasons);

    const fetchJobPipelineData = () => {
        const url = `${apiServer}/api/masterdata/job_pipeline`;

        fetchData(url, (data) => {
            console.log("API Response - Job Pipeline Data:", data);
        });
    };

    const fetchSenders = () =>
        fetchData(`${apiServer}/api/marketing/senders`, setSenders);

    const renderForm = () => {
        let ActionForm;
        switch (triggerCode) {
            // GDPR
            case 'CANDIDATE_ADDED_MANUALLY':
                ActionForm = ACandidateIsAddedManually;
                break;
            case 'GDPR_CONSENT_REQUEST_REJECTED':
                ActionForm = GDPRConsentRequestIsRejected;
                break;
            case 'GDPR_CONSENT_REQUEST_NO_RESPONSE':
                ActionForm = NoResponseToGDPRConsentRequestNewConsent;
                break;
            case 'GDPR_CONSENT_REQUEST_EXPIRING':
                ActionForm = GDPRPrivacyConsentIsAboutToExpire;
                break;
            case 'GDPR_CONSENT_REQUEST_EXISTING_NO_RESPONSE':
                ActionForm = NoResponseToGDPRConsentRequestConsentProvidedBefore;
                break;
            case 'GDPR_CONSENT_REQUEST_ADDED_BY_CV_SUBMIT':
                ActionForm = GDPRConsentAddedByTheSystemAfterCVSubmit;
                break;
            case 'GDPR_CONSENT_REQUEST_ADDED_BY_JOB_APPLICATION':
                ActionForm = GDPRConsentAddedByTheSystemAfterJobApplication;
                break;
            case 'GDPR_CONSENT_REQUEST_APPROVED':
                ActionForm = GDPRConsentRequestIsApproved;
                break;

            // ATS
            case 'ATS_JOB_ABOUT_EXPIRE':
                ActionForm = JobIsAboutToExpire;
                break;
            case 'JOB_EXPIRED':
                ActionForm = JoBHasExpired;
                break;
            case 'ATS_PLACEMENT_CREATED':
                ActionForm = PlacementIsCreated;
                break;
            case 'JOB_ADDED_TO_SYSTEM':
                ActionForm = JobIsAddedToTheSystem;
                break;
            case 'JOB_APPLICATION_RECEIVED':
                ActionForm = JobApplicationIsNotReviewed;
                break;
            case 'ATS_PLACEMENT_STARTED':
                ActionForm = PlacedCandidateHasStarted;
                break;
            case 'ATS_PLACEMENT_ABOUT_START':
                ActionForm = PlacedCandidateIsAboutToStart;
                break;
            case 'NEW_CANDIDATE_ADDED_MANUALLY':
                ActionForm = ACandidateAddedManually;
                break;
            case 'ATS_CANDIDATE_ADDED_TO_PIPELINE':
                ActionForm = CandidateAddedToJobPipeline;
                break;
            case 'PLACEMENT_INVOICE_CREATION_DUE':
                ActionForm = PlacementInvoiceCreationIsDue;
                break;
            case 'ATS_PLACEMENT_ABOUT_END':
                ActionForm = WhenAPlacementIsNearingItsEndDate;
                break;
            case 'PIPELINE_STATUS_UPDATE':
                ActionForm = PipelineStatusUpdate;
                break;
            case 'JOB_STATUS_UPDATED':
                ActionForm = JobStatusUpdate;
                break;
            case 'JOB_INTERVIEW_DUE':
                ActionForm = JobInterviewIsDue;
                break;
            case 'ATS_CANDIDATE_CV_SHARED':
                ActionForm = candidateCVIsShared;
                break;
            case 'JOB_STATUS_OPEN':
                ActionForm = JobStatusOpen;
                break;

            // CRM Data
            case 'NEW_LEAD_ADDED_MANUALLY':
                ActionForm = LeadIsAddedManually;
                break;
            case 'LEAD_STATUS_UPDATED':
                ActionForm = LeadStatusIsUpdated;
                break;
            case 'LEAD_GENERATOR_FORM_SUBMITTED':
                ActionForm = LeadFormIsSubmitted;
                break;
            case 'NEW_CONTACT_ADDED_MANUALLY':
                ActionForm = ContactIsAddedManually;
                break;
            case 'CONTACT_STATUS_UPDATED':
                ActionForm = ContactStatusIsUpdated;
                break;
            case 'NEW_OPPORTUNITY_CREATED_MANUALLY':
                ActionForm = OpportunityIsCreatedManually;
                break;
            case 'OPPORTUNITY_STATUS_UPDATED':
                ActionForm = OpportunityPipelineStatusIsUpdated;
                break;
            case 'NO_ACTIVITY_CANDIDATE':
                ActionForm = NoActivityForACandidate;
                break;
            default:
                return <div>Invalid Action code.</div>;
        }

        return (
            <ActionForm
                handleFormSubmit={handleFormSubmit}
                actionCode={actionCode}
                formData={selectedActionData?.formData}
                users={users}
                selectedNodeId={selectedNodeId}
                webhooks={webhooks}
                rejectReasons={rejectReasons}
                senders={senders}
                fetchSenders={fetchSenders}
                pipelineStatuses={pipelineStatuses}
                jobStatuses={jobStatus}
                emailSequences={emailSequences} // <-- Add this line

            />
        );
    };

    const onNodeClick = (_, node) => {
        if (node.id === "exit") return;
        setSelectedNodeId(node.id);
        if (node.id === "1") {
            if (!selectedTriggerName) {
                setSelectedNode(node);
                setDrawerVisible(true);
                setActionDrawerVisible(false);
            }
        } else if (node.id === "2" || node.type === "addAction") {
            const savedData = JSON.parse(localStorage.getItem("savedActionData")) || [];
            const actionData = savedData.find((action) => action.node.id === node.id);
            if (actionData) {
                setSelectedNode(node);
                setSelectedActionData(actionData);
                setActionCode(actionData.selectedAction?.code);
                setEditDrawerVisible(true);
            }
            else if (selectedTriggerName) {
                setActionDrawerVisible(true);
                setDrawerVisible(false);
            } else {
                setDrawerVisible(true);
                setActionDrawerVisible(false);

            }
        }
    };
    const handleTriggerSelection = (trigger) => {
        const updatedNodes = nodes.map((node) =>
            node.id === "1" ? { ...node, data: { label: trigger.name } } : node
        );
        setNodes(updatedNodes);
        setSelectedTriggerName(trigger.name);
        setSelectedTrigger(trigger)
        localStorage.setItem('selectedTriggerName', trigger.name);
        localStorage.setItem("selectedTrigger", JSON.stringify(trigger));

        setDrawerVisible(false);
        // setIsFilterDrawerVisible(true)
        setIconVisible(true);

        const code = trigger.code;
        setTriggerCode(code);
        console.log("triggercode",code)
        localStorage.setItem('triggerCode', code);
        fetchActions(code);
    };
    const closeDrawer = () => {
        setDrawerVisible(false);
        setSelectedNode(null);
        setSelectedNodeId(null);
        setActionDrawerVisible(false)
    };

    const handleDragStart = (event, trigger) => {
        closeDrawer();
        event.dataTransfer.setData("text/plain", JSON.stringify(trigger));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = event.dataTransfer.getData("text/plain");
        setIconVisible(true);
        setDrawerVisible(false);

        if (data) {
            try {
                const draggedTrigger = JSON.parse(data);

                // Get the target node's ID from the `data-id` attribute of the event target
                const targetElement = event.target.closest("[data-id]");
                const targetNodeId = targetElement?.getAttribute("data-id");

                if (!targetNodeId) {
                    console.error("No target node ID found in drop event.");
                    return;
                }

                // Update nodes state with new trigger
                const updatedNodes = nodes.map((node) => {
                    if (node.id === "1") {
                        return {
                            ...node,
                            data: { label: draggedTrigger.name },
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);
                setDroppedItem(draggedTrigger.name);
                setSelectedTriggerName(draggedTrigger.name);
                setSelectedTrigger(draggedTrigger)
                localStorage.setItem('selectedTriggerName', draggedTrigger.name);
                localStorage.setItem("selectedTrigger", JSON.stringify(draggedTrigger));
                const code = draggedTrigger.code;
                setTriggerCode(code);
                localStorage.setItem('triggerCode', code);
                fetchActions(code);
                // Store trigger data in localStorage
                localStorage.setItem("droppedTrigger", JSON.stringify(draggedTrigger));
            } catch (error) {
                console.error("Error parsing the dropped data:", error);
            }
        } else {
            console.error("No data found in drop event.");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleNodeDelete = () => {
        localStorage.removeItem('selectedTriggerName');
        localStorage.removeItem('savedActionData');
        localStorage.removeItem('droppedTrigger');
        localStorage.removeItem('isFirstNodeUsed');
        localStorage.removeItem('selectedNodeId');
        localStorage.removeItem('triggerCode');

        setNodes(initialNodes);
        setEdges(initialEdges);
        resetAll();
        setActionCode(null);
        setIconVisible(false);
        setDrawerVisible(true);
        setIsFirstNodeUsed(false);
        closeActionDrawer();
    };

    const moduleNames = [
        "All",
        ...new Set(
            triggers.map((trigger) =>
                trigger.module.name.replaceAll(" Automation", "")
            )
        ),
    ];

    const filteredTriggers =
        selectFilter === "All"
            ? triggers
            : triggers.filter(
                (trigger) => trigger.module.name === selectFilter + " Automation"
            );

    if (isLoading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    //Actions
    const handleActionSelection = (action) => {
        setSelectedActions((prevActions) => [...prevActions, action]);
        setSelectedAction(action);
        setActionDrawerVisible(false)
        setFormDrawerVisible(true);
        const code = action.code
        setActionCode(code)
        console.log("actionCode",code)
        console.log("selectedtriggerName",selectedTriggerName)
    };
    const handleActionDragStart = (event, action) => {
        closeActionDrawer();
        event.dataTransfer.setData("text/plain", JSON.stringify(action)); // Set the dragged trigger data
    };
    const handleActionDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Get the target node's ID from the data-id attribute of the event target
        const targetElement = event.target.closest("[data-id]");
        const targetNodeId = targetElement?.getAttribute("data-id");

        // Check if addTrigger is empty, if so don't allow the drop
        if (!selectedTriggerName) {
            alert("Please add a trigger first before dropping actions.");
            return; // Don't process the drop if no trigger is added
        }
        // Allow the action drop since a trigger is added
        setActionDrawerVisible(true);

        const data = event.dataTransfer.getData("text/plain");
        if (!data) {
            console.error("No data found in drop event.");
            return;
        }
        try {
            const action = JSON.parse(data); // Parse the dropped action
            // Update Node 2's label if no actions have been selected yet
            if (selectedActions.length === 0) {
                setNodes((prevNodes) =>
                    prevNodes.map((node) =>
                        node.id === targetNodeId // Target Node 2 specifically
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                },
                            }
                            : node // Leave other nodes unchanged
                    )
                );
            }

            // Add the action to the selected actions array
            setSelectedActions((prevActions) => [...prevActions, action]);

            // Set the selected action and open the form drawer
            setSelectedAction(action);
            setActionDrawerVisible(false);
            setFormDrawerVisible(true);
        } catch (error) {
            console.error("Error processing dropped action:", error);
        }
    };

    const handleActionDragOver  = (event) => {
        event.preventDefault();
    };
    const closeActionDrawer = () => {
        setSelectedNodeId(null);
        setActionDrawerVisible(false);
        setSelectedBlock(null);
    };

    const createNewNode = (label, nodesLength) => {
        // Increment the nodeCounter before using it for the new ID
        setNodeCounter((prevCounter) => prevCounter + 1);

        const newNodeId = `${nodeCounter + 1}`; // Use the updated nodeCounter for the new ID
        let newNodePositionY = 100;

        // Calculate the new position dynamically
        newNodePositionY = 250 + (nodesLength - 1) * 100;

        return {
            id: newNodeId,
            type: 'addAction',
            data: { label: label },
            position: { x: 100, y: newNodePositionY }, // Dynamically position nodes
        };
    };

    const createNewEdge = (sourceNodeId, targetNodeId) => {
        return {
            id: `e${sourceNodeId}-${targetNodeId}`,
            source: sourceNodeId,
            target: targetNodeId,
            type: "button",

            style: { stroke: '#d7d9e1', strokeWidth: 1 },
        };
    };
    const handleFormSubmit = (values) => {
        const updatedData = generateUpdatedData(selectedAction, values);
        let newNode;
        let isFirstNodeUsed = JSON.parse(localStorage.getItem('isFirstNodeUsed')) || false;

        if (!isFirstNodeUsed) {
            const firstNode = nodes.find((node) => node.id === "2");
            const exitNodeExists = nodes.some((node) => node.id === "exit");

            // Update the label for the first node
            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === "2" ? { ...node, data: updatedData } : node
                )
            );
            if (!exitNodeExists) {
                setNodes((prevNodes) => [
                    ...prevNodes,
                    { id: "exit", type: "default", data: { label: "Exit" }, position: { x: 200, y: firstNode.position.y + 130 } },
                ]);
                setEdges((prevEdges) => [
                    ...prevEdges.filter((edge) => edge.target !== "exit"),
                    createNewEdge("2", "exit"),
                ]);
            }
            setSelectedNodeId(null);
            setIsFirstNodeUsed(true);
            localStorage.setItem('isFirstNodeUsed', JSON.stringify(true));
        } else {
            const nodeToUpdate = nodes.find((node) => node.id === selectedNodeId);
            if (nodeToUpdate) {
                // If the node exists, update it
                setNodes((prevNodes) =>
                    prevNodes.map((node) =>
                        node.id === selectedNodeId ? { ...node, data: updatedData } : node
                    )
                );
            } else {
                // Create new node
                newNode = createNewNode(updatedData.label, nodes.length);
                const lastAddActionNode = nodes.filter((node) => node.type === "addAction").slice(-1)[0];

                setNodes((prevNodes) => [
                    ...prevNodes.filter((node) => node.id !== "exit"), // Remove exit node
                    newNode,
                    { id: "exit", type: "default", data: { label: "Exit" }, position: { x: 200, y: newNode.position.y + 130 } },
                ]);

                setEdges((prevEdges) => [
                    ...prevEdges.filter((edge) => edge.target !== "exit"),
                    createNewEdge(lastAddActionNode.id, newNode.id),
                    createNewEdge(newNode.id, "exit"),
                ]);
            }
        }
        const existingData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const updatedActions = existingData.map((action) =>
            action.node.id === (newNode?.id || selectedNodeId)
                ? { ...action, selectedAction, formData: values } // Update existing node action
                : action
        );
        if (!updatedActions.some(action => action.node.id === (newNode?.id || selectedNodeId))) {
            updatedActions.push({
                selectedAction,
                formData: values,
                node: newNode || { id: selectedNodeId },
            });
        }
        localStorage.setItem("savedActionData", JSON.stringify(updatedActions));
        setSelectedActionData({
            selectedAction: null,
            formData: {},
        });
        setActionCode(null);
        setEditDrawerVisible(false);
        setFormDrawerVisible(false);
        setSelectedNodeId(null);
    };
    const closeFormDrawer = () => {
        setSelectedNodeId(null);
        setFormDrawerVisible(false);

    };
    const handleActionChange = (e) => {
        const selectedId = e.target.value;
        const selectedAction = actions.find(action => action._id === selectedId);

        if (selectedAction) {
            setSelectedActionData({
                selectedAction,
                formData: selectedAction.formData || {}
            });

            setActionCode(selectedAction.code);
        }
    };

    const closeEditDrawer = () => {
        setSelectedNodeId(null);
        setEditDrawerVisible(false);
    };

    const deleteAction = (event) => {
        event.stopPropagation();

        const isConfirmed = window.confirm("Are you sure you want to delete this action?");
        if (!isConfirmed) return;

        const targetElement = event.target.closest("[data-id]");
        const targetNodeId = targetElement?.getAttribute("data-id");
        if (!targetNodeId) return;

        // Find all 'addAction' nodes
        const addActionNodes = nodes.filter((node) => node.type === "addAction");

        if (addActionNodes.length === 1) {
            // If there's only one action node, reset to the initial state
            const updatedNodes = nodes.map((node) => {
                if (node.type === "addAction") {
                    // Reset to node 2's state from initialNodes
                    const initialNode = initialNodes.find((n) => n.id === "2");
                    return initialNode ? { ...initialNode } : node;
                }
                return node;
            }).filter((node) => node.id !== "exit"); // Remove the exit node

            // Remove `isFirstNodeUsed` from localStorage
            localStorage.setItem('isFirstNodeUsed', JSON.stringify(false));

            // Reset state after deletion
            setIsFirstNodeUsed(false);
            setSelectedAction(null);
            setFormData([]);
            resetSelectedAction();
            resetFormData();
            setNodes(updatedNodes);
            setEdges(initialEdges);

        } else {
            // Find the deleted node and remove it
            const deletedNode = nodes.find((node) => node.id === targetNodeId);
            if (!deletedNode) return;

            // Find edges connected to the deleted node
            const incomingEdge = edges.find((edge) => edge.target === targetNodeId);
            const outgoingEdge = edges.find((edge) => edge.source === targetNodeId);

            const updatedNodes = nodes.filter((node) => node.id !== targetNodeId);

            let updatedEdges = edges.filter(
                (edge) => edge.source !== targetNodeId && edge.target !== targetNodeId
            );

            // Reconnect the previous node to the exit node or custom edge handling
            if (incomingEdge && outgoingEdge) {
                const newEdge = {
                    id: `${incomingEdge.source}-${outgoingEdge.target}`,
                    source: incomingEdge.source,
                    target: outgoingEdge.target,
                    type: incomingEdge.source === "1" ? "custom" : "button", // Conditional edge type
                };
                updatedEdges.push(newEdge);
            }

            // Adjust positions of nodes below the deleted node
            const adjustedNodes = updatedNodes.map((node) => {
                if (node.position.y > deletedNode.position.y) {
                    return {
                        ...node,
                        position: {
                            ...node.position,
                            y: node.position.y - 100,
                        },
                    };
                }
                return node;
            });

            // Update the position of the "Exit" node
            const exitNodeIndex = adjustedNodes.findIndex((node) => node.id === "exit");
            if (exitNodeIndex !== -1) {
                const lastActionNode = adjustedNodes
                    .filter((node) => node.type === "addAction")
                    .slice(-1)[0]; // Get the last node

                const exitNodePositionY = lastActionNode
                    ? lastActionNode.position.y + 130
                    : 130; // Default position if no action node exists

                adjustedNodes[exitNodeIndex] = {
                    ...adjustedNodes[exitNodeIndex],
                    position: { ...adjustedNodes[exitNodeIndex].position, y: exitNodePositionY },
                };
            }

            // Update the state
            setNodes(adjustedNodes);
            setEdges(updatedEdges);

            // Update `isFirstNodeUsed` in localStorage and state
            const remainingActions = adjustedNodes.filter((node) => node.type === "addAction");
            const isFirstNodeUsed = remainingActions.length > 0;
            localStorage.setItem('isFirstNodeUsed', JSON.stringify(isFirstNodeUsed));
            setIsFirstNodeUsed(isFirstNodeUsed);
        }

        // Update localStorage for saved actions
        const savedData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const updatedData = savedData.filter((item) => item.node.id !== targetNodeId);
        localStorage.setItem("savedActionData", JSON.stringify(updatedData));
    };

    return (
        <div style={{ height: "90vh", verticalAlign: "top",position: "relative" }}>
            <Button
                type="primary"
                icon={<SaveOutlined />} // ✅ Ensure this is wrapped in JSX brackets
                onClick={handleSaveTrigger}
                style={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}
            >
                Save Trigger
            </Button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                nodeTypes={{
                    addTrigger: (props) => (
                        <AddTriggerNode {...props} onDelete={handleNodeDelete}
                                        selectedTriggerName={selectedTriggerName}
                                        isFilterDrawerVisible={isFilterDrawerVisible}
                                        setIsFilterDrawerVisible={setIsFilterDrawerVisible}
                                        jobTypes={jobTypes}
                                        tags={tags}
                                        candidateStatus={candidateStatus}
                                        source={source}
                                        jobStatus={jobStatus}
                                        users={users}
                                        selectedTrigger={selectedTrigger}
                        />
                    ),
                    addAction: (props) => (
                        <AddActionNode {...props} nodes={nodes}
                                       setNodes={setNodes}
                                       setEdges={setEdges}
                                       selectedAction={selectedAction}
                                       setSelectedAction={setSelectedAction}
                                       setFormData={setFormData}
                                       deleteAction={deleteAction}
                                       handleActionDrop={handleActionDrop}
                                       handleActionDragOver={handleActionDragOver}
                                       selectedActions={selectedActions}
                                       targetNodeId={props.id}
                        />
                    )
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                edgeTypes={{
                    custom: (props) => (
                        <FilterIcon {...props} iconVisible={iconVisible} selectedTriggerName={selectedTriggerName} selectedTrigger={selectedTrigger} />
                    ),
                    button: (props) => (
                        <AddActionButton {...props} setActionDrawerVisible={setActionDrawerVisible} nodes={nodes} />
                    ),
                }}
                fitView
            >
                <Background />
            </ReactFlow>

            <Drawer
                title={"Triggers"}
                width={580}
                open={drawerVisible}
                onClose={closeDrawer}
            >
                <div>
                    <Segmented
                        options={moduleNames}
                        value={selectFilter}
                        onChange={setSelectFilter}
                        style={{ marginBottom: "20px" }}
                    />

                    <div
                        style={{
                            backgroundColor: "#f0f2f5",
                            padding: "10px",
                            borderRadius: "10px",
                        }}
                    >
                        {filteredTriggers.length === 0 ? (
                            <p>No triggers available</p>
                        ) : (
                            filteredTriggers.map((trigger) => (
                                <Card
                                    key={trigger.code}
                                    style={{ marginBottom: "14px", cursor: "pointer" }}
                                    hoverable
                                    onClick={() => handleTriggerSelection(trigger)}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, trigger)}
                                >
                                    <div>
                                        <Flex gap={"middle"}>
                                            <GrTrigger size={20} /> <span>{trigger.name}</span>
                                        </Flex>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </Drawer>

            <Drawer
                title="Actions"
                width={550}
                open={actionDrawerVisible}
                onClose={closeActionDrawer}
            >
                <div style={{ backgroundColor: '#f0f2f5', padding: '10px', borderRadius: '10px' }}>
                    {actions.map((action) => (
                        <Card
                            key={action.id}
                            style={{ marginBottom: '14px', cursor: 'pointer' }}
                            hoverable
                            onClick={() => handleActionSelection(action)} // Handle action selection
                            draggable
                            onDragStart={(event) => handleActionDragStart(event, action)}
                        >
                            <div>
                                <Flex gap={'middle'}>
                                    <IoIosFlash size={20} color="rgb(11, 47, 115)" />
                                    <span>{action.name}</span>
                                </Flex>
                            </div>
                        </Card>
                    ))}
                </div>
            </Drawer>

            {/* Form Drawer */}
            <Drawer
                title={`Configure ${selectedAction?.name || ''}`}
                width={550}
                open={formDrawerVisible}
                onClose={closeFormDrawer}
            >
                <div style={{ marginTop: '20px' }}>
                    {isLoading ? <Spin /> : (
                        <Form onFinish={handleFormSubmit}>
                            {renderForm()} {/* This now returns only form fields */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Add Action
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>

            </Drawer>

            <Drawer
                title="Action Data"
                open={editDrawerVisible}
                onClose={closeEditDrawer}
                width={550}
            >
                <div>
                    <h3>Select Action</h3>
                    <select
                        name="selectedAction"
                        value={selectedActionData?.selectedAction?._id || ''}
                        onChange={handleActionChange}
                        style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                    >
                        {actions.map((action) => (
                            <option key={action._id} value={action._id}>
                                {action.name}
                            </option>
                        ))}
                    </select>

                    <Form onFinish={handleFormSubmit}>
                        {selectedNodeId && renderForm(formData[selectedNodeId] || {})}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add Action
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </div>
    );
};

export default WorkFlow;