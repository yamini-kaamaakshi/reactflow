import  { useEffect, useState } from "react";
import ReactFlow, {Background, Handle, Position} from "react-flow-renderer";
import { Drawer, Segmented, Spin } from "antd";
import {  PlusOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { MdDelete } from "react-icons/md";
import { Button,} from "antd";
import { IoIosFlash } from "react-icons/io";
import { VscRunCoverage } from "react-icons/vsc";
import { GrTrigger } from "react-icons/gr";
import { BsFunnelFill } from "react-icons/bs";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import JobIsAboutToExpire from "./Forms/JobIsAboutToExpire.jsx";
import PlacementIscreated from "./Forms/PlacementIscreated.jsx";
import JobStatusForm from "./Filters/TriggerFilters.jsx"


const useFilterStore = create(
    persist(
        (set) => ({
            isFilterDrawerVisible: false,  // Add filterDrawerVisible state
            setIsFilterDrawerVisible: (isVisible) => set({ isFilterDrawerVisible: isVisible }), // Method to update filterDrawerVisible
            setIconColor: (color) => set({ iconColor: color }),
        }),
        {
            name: "applied-filters",
        }
    )
);
// eslint-disable-next-line react/prop-types
const AddTriggerNode = ({ data, onDelete, selectedTriggerName,jobTypes,tags,selectedTrigger,users }) => {
    const [formData, setFormData] = useState({ jobStatus: [] });
    const { setIconColor,isFilterDrawerVisible,setIsFilterDrawerVisible } = useFilterStore();

    useEffect(() => {
        // Ensure the drawer is closed on page reload
        setIsFilterDrawerVisible(false);
    }, []); // Runs once on mount

    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;
    const hasFilters = parsedTrigger?.hasFilters === true



    const [isHovered, setIsHovered] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState(() => {
        const savedApplied = localStorage.getItem("appliedFilters");
        return savedApplied ? JSON.parse(savedApplied) : null;
    });


    // Persist appliedFilters in localStorage whenever it changes
    useEffect(() => {
        if (appliedFilters) {
            localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
        }
    }, [appliedFilters]);

    const handleFilterDrawerOpen = () => {
        setIsFilterDrawerVisible(true);

    };
    // Close Filter Drawer
    const closeDrawer = () => {
        setIsFilterDrawerVisible(false);
    };



    // Handle changes in the form's Select input
    const handleFilterChange = (value, field) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setSelectedTags(value)
    };

    // When the form is submitted, map job IDs to objects with both id and name,
    // update appliedFilters, and update the formData.
    const handleFilterSubmit = (values) => {
        setAppliedFilters(values);
        setFormData(values);
        setIconColor("green")
        closeDrawer();

    };

    // Handle Delete Button Click
    const handleDelete = () => {
        localStorage.removeItem('appliedFilters');
        localStorage.removeItem('selectedTrigger');
        setAppliedFilters(null);
        setFormData(null)
        setIconColor("black");
        onDelete();
    };

    return (
        <>
            {/* Trigger Label */}
            <span>
        <div
            style={{
                backgroundColor: "rgb(199, 220, 252)",
                paddingLeft: 8,
                paddingTop: 3,
                paddingBottom: 3,
                paddingRight: 8,
                borderRadius: 16,
                marginBottom: 7,
                display: "inline-block",
            }}
        >
          <Flex gap={2}>
            <IoIosFlash size={16} color={"rgb(11, 47, 115)"} />
            <span
                style={{
                    color: "rgb(11, 47, 115)",
                    fontWeight: "medium",
                    fontSize: "14px",
                }}
            >
              When this happens
            </span>
          </Flex>
        </div>
      </span>

            {/* Card Component */}
            <Card
                style={{ width: 350, padding: 0 }}
                hoverable
                size="small"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Display Trigger Name or Label */}
                <Flex align="center" justify="center" gap="middle">
                    {!selectedTriggerName && <PlusOutlined />}
                    <span style={{ color: "rgb(11, 47, 115)" }}>
                     {selectedTriggerName || data.label}
          </span>
                </Flex>

                {/* Filters Button */}
                {selectedTriggerName &&  !appliedFilters && hasFilters && (
                    <div
                        style={{
                            marginTop: 10,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={handleFilterDrawerOpen}
                            size="small"
                            style={{
                                height: "15px",
                                width: "40px",
                                fontSize: "12px",
                            }}
                        >
                            Filters
                        </Button>
                    </div>
                )}

                {/* Delete Button */}
                {selectedTriggerName && isHovered &&  (
                    <Button
                        onClick={handleDelete}
                        style={{
                            backgroundColor: "white",
                            border: "none",
                            position: "absolute",
                            top: "5px",
                            right: "10px",
                            padding: 0,
                        }}
                        icon={<MdDelete style={{ color: "red", fontSize: "16px" }} />}
                    />
                )}


                {appliedFilters && (
                    <div
                        style={{
                            marginTop: 8,
                            backgroundColor: "#f0f2f5",
                            padding: "1px 10px",
                            borderRadius: "5px",
                            display: "inline-block",
                        }}
                    >

                            <p style={{ color: "rgb(11, 47, 115)", fontSize: "9px" }}>
                                {appliedFilters.jobType && (
                                    <>
                                        <span style={{ fontWeight: "bold" }}>Job Type:</span>{" "}
                                        {appliedFilters.jobType.map((jobType) => jobType).join(", ")}
                                    </>
                                )}
                                {appliedFilters.tags && (
                                    <>
                                        <span style={{fontWeight:"bold"}}> Tags:</span>{" "}
                                        {appliedFilters.tags.map((tag) => tag).join(", ")}
                                    </>
                                )}
                            </p>


                    </div>
                )}


                <Handle type="source" position={Position.Bottom} />
            </Card>

            {/* Filter Drawer */}
            <Drawer
                title="Select a Filter"
                width={550}
                open={isFilterDrawerVisible}
                onClose={closeDrawer}
            >
                <JobStatusForm
                    initialValues={formData}
                    onSubmit={handleFilterSubmit}
                    onFilterChange={handleFilterChange}
                    jobTypes={jobTypes}
                    tags={tags}
                    users={users}
                    selectedTags={selectedTags}
                    selectedTrigger={selectedTrigger}
                />
            </Drawer>
        </>
    );
};


// eslint-disable-next-line react/prop-types
const CustomEdge = ({id, sourceX, sourceY, targetX, targetY, selectedTriggerName, selectedTrigger}) => {
    const edgePath = `M${sourceX},${sourceY}L${targetX},${targetY}`;
    const iconX = (sourceX + targetX) / 2 - 12;
    const iconY = (sourceY + targetY) / 2 - 12;
    const { iconColor } = useFilterStore();

    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;
    const hasFilters = parsedTrigger?.hasFilters === true

    return (
        <g>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                style={{ stroke: "#000", strokeWidth: 2 }}
            />
            {selectedTriggerName && hasFilters && (
                <foreignObject x={iconX} y={iconY} width="24" height="24">
                    <BsFunnelFill style={{ fontSize: "24px", color: iconColor }} />
                </foreignObject>
            )}
        </g>
    );
};


// eslint-disable-next-line react/prop-types
const CustomButton = ({id, sourceX, sourceY, targetX, targetY, setActionDrawerVisible, nodes
                      }) => {
    // Edge path
    const edgePath = `M${sourceX},${sourceY}L${targetX},${targetY}`;
    const [, setIsHovered] = useState(false);
    // eslint-disable-next-line react/prop-types
    const filteredNodes = nodes.filter(node => node.type === "addAction");
    const latestNode = filteredNodes.length > 0 ? filteredNodes[filteredNodes.length - 1] : null;


    // Calculate the button's position (middle of the edge)
    const iconX =((sourceX + targetX) / 2 - 15 / 2);
    const iconY =latestNode.position.y+98
    return (
        <g   onMouseEnter={() => setIsHovered(true)} // Show button on hover
             onMouseLeave={() => setIsHovered(false)} >
            {/* Draw the edge */}
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                style={{ stroke: "#000", strokeWidth: 2 }}
            />
            {/* Add button in the middle of the edge */}
            <foreignObject
                x={iconX}
                y={iconY}
                width={20}
                height={20}
            >
                <button
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 15,
                        height: 15,
                        backgroundColor: "black",
                        borderRadius: "50%",
                        border: "none",
                        transition: "background-color 0.8s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#555"; // Change background color on hover
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "black"; // Reset background color when not hovering
                    }}
                    onClick={() => setActionDrawerVisible(true)} // Handle button click
                >
                    <PlusOutlined
                        style={{
                            fontSize: "10px",
                            color: "white",
                        }}
                    />
                </button>
            </foreignObject>
        </g>
    );
};

// eslint-disable-next-line react/prop-types
const AddActionNode = ({data,deleteAction,handleActionDrop,handleActionDragOver,targetNodeId}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [storedAction, setStoredAction] = useState({ selectedAction: null, formData: null });
    useEffect(() => {
        const savedActionData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const nodeActionData = savedActionData.find(action => action.node.id === targetNodeId);
        if (nodeActionData) {
            setStoredAction({
                selectedAction: nodeActionData.selectedAction,
                formData: nodeActionData.formData,
            });
        }
    }, [targetNodeId]);

    return (
        <>
            <span>
                 <div style={{
                     backgroundColor: "rgb(199, 220, 252)",
                     paddingLeft: 8,
                     paddingTop: 3,
                     paddingBottom: 3,
                     paddingRight: 8,
                     borderRadius: 16,
                     marginBottom: 7,
                     display: 'inline-block'
                 }}>
                     <Flex gap={2}>
                         <VscRunCoverage color={"rgb(11, 47, 115)"} size={16}/><span
                         style={{
                             fontSize: '14px',
                             color: "rgb(11, 47, 115)",
                             fontWeight: "medium"
                         }}>Then do this</span>
                     </Flex>
                 </div>
            </span>
            <Card
                style={{
                    width: 350,
                    padding: 0,
                    border: "1px dashed #dadada",
                    position: "relative",
                }}
                hoverable
                size="small"
                onDrop={handleActionDrop}
                onDragOver={handleActionDragOver}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div>
                    <Handle type="target" position="top" />
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                          <span style={{fontSize: "14px", color: "#888888"}}>
                          { data.label}

                           </span>
                    </div>
                    {storedAction?.selectedAction?.name && isHovered && (
                        <Button
                            onClick={deleteAction}
                            style={{
                                backgroundColor: "white",
                                border: "none",
                                position: "absolute",
                                top: "5px",
                                right: "10px",
                                padding: 0,
                            }}
                            icon={<MdDelete style={{ color: "red", fontSize: "16px" }} />}
                        />
                    )}
                    <Handle type="source" position="bottom" />
                </div>
            </Card>
        </>
    );
};

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
    const [users, setUsers] = useState([]);


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
            // fetchUsers();
        }
    }, [triggerCode]);
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

    const fetchTriggers = () =>
        fetchData(`${apiServer}/api/lookup_automation/triggers`, setTriggers);


    const fetchActions = (triggerCode) =>
        fetchData(`${apiServer}/api/lookup_automation/actions?triggerCode=${triggerCode}`, setActions);

    const fetchJobTypes = () =>
        fetchData(`${apiServer}/api/masterdata/jobTypes`, setJobTypes);

    const fetchTags = () =>
        fetchData(`${apiServer}/api/masterdata/tags/v2`, setTags);

    // const fetchUsers = async () => {
    //     const response = await axios.get(`https://api.recruitly.io/api/masterdata/candidatestatus`, {
    //         params: { apiKey, paginated: false },
    //     });
    //
    //     const usersData = response.data.data;
    //     setUsers(usersData)
    //     console.log("usersData",usersData)
    //
    // };
    //

    const renderForm = () => {
        let ActionForm;
        switch (triggerCode) {
            case 'ATS_JOB_ABOUT_EXPIRE':
                ActionForm = JobIsAboutToExpire;
                break;
            case 'ATS_PLACEMENT_CREATED':
                ActionForm = PlacementIscreated;
                break;
            default:
                return <div>Invalid Action code.</div>;
        }

        return (
            <ActionForm
                handleFormSubmit={handleFormSubmit}
                actionCode={actionCode}
                formData={selectedActionData?.formData}
                selectedNodeId={selectedNodeId}
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
        setIsFilterDrawerVisible(true)
        setIconVisible(true);

        const code = trigger.code;
        setTriggerCode(code);

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
        if (window.confirm("Are you sure you want to delete these nodes?")) {
            localStorage.removeItem('selectedTriggerName');
            localStorage.removeItem('savedActionData');
            localStorage.removeItem('droppedTrigger');
            localStorage.removeItem('isFirstNodeUsed');
            localStorage.removeItem('selectedNodeId');
            localStorage.removeItem('triggerCode');
            setNodes(initialNodes);
            setEdges(initialEdges)

            resetAll();
            setActionCode(null)
            setIconVisible(false);
            setDrawerVisible(true);
            setIsFirstNodeUsed(false);

            closeActionDrawer();
        }
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

// Your other logic follows here
    const handleActionSelection = (action) => {
        setSelectedActions((prevActions) => [...prevActions, action]);
        setSelectedAction(action);
        setActionDrawerVisible(false)
        setFormDrawerVisible(true);
        const code = action.code
        setActionCode(code)
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

    const generateUpdatedData = (selectedAction, values) => {
        let label;
        switch (selectedAction?.code) {
            case 'ATS_PLACEMENT_CREATED_SEND_EMAIL_TO_USER':
            case 'ATS_PLACEMENT_CREATED_SEND_WEBHOOK_NOTIFICATION':
            case 'ATS_PLACEMENT_CREATED_ADD_TASK_CONCERNED_USERS':
            case 'ATS_PLACEMENT_CREATED_ADD_TASK_TO_OWNER':
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
            type: "button", // Use custom button type

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
        <div style={{ height: "90vh", verticalAlign: "top" }}>
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
                        <CustomEdge {...props} iconVisible={iconVisible} selectedTriggerName={selectedTriggerName} selectedTrigger={selectedTrigger} />
                    ),
                    button: (props) => (
                        <CustomButton {...props} setActionDrawerVisible={setActionDrawerVisible} nodes={nodes} />
                    ),
                }}
                fitView
            >
                {/*<Controls />*/}
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
                <div style={{marginTop: '20px'}}>
                    {isLoading ? <Spin/> : renderForm()}
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
                    {selectedNodeId && renderForm(formData[selectedNodeId] || {})}
                </div>
            </Drawer>


        </div>
    );
};

export default WorkFlow;