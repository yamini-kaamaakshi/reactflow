import React, { useEffect, useState } from "react";
import ReactFlow, {Background, Controls, Handle, Position} from "react-flow-renderer";
import { Drawer, Segmented, Spin } from "antd";
import {  PlusOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { MdDelete } from "react-icons/md";
import { Button, Form, Select } from "antd";
import { IoIosFlash } from "react-icons/io";
import { VscRunCoverage } from "react-icons/vsc";
import { GrTrigger } from "react-icons/gr";
import { BsFunnelFill } from "react-icons/bs";
import { create } from "zustand";
import { persist } from "zustand/middleware";



const useFilterStore = create(
    persist(
        (set) => ({
            appliedFilters: null,
            setAppliedFilters: (filters) => set({ appliedFilters: filters }),

            setIconColor: (color) => set({ iconColor: color }),
        }),
        {
            name: "applied-filters",
        }
    )
);


const AddTriggerNode = ({ data, onDelete,selectedTriggerName }) => {
    const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
    const [, setIsTriggerDrawerVisible] = useState(false);
    const [formData, setFormData] = useState({ jobStatus: "" });

    const { appliedFilters, setAppliedFilters, setIconColor } = useFilterStore()
    const [isHovered, setIsHovered] = useState(false);

    const handleFilterDrawerOpen = () => {
        setIsFilterDrawerVisible(true);
        setIsTriggerDrawerVisible(false);
    };

    const closeDrawer = () => {
        setIsFilterDrawerVisible(false);
        setIsTriggerDrawerVisible(false);
    };

    const handleFilterChange = (value, field) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFilterSubmit = () => {
        console.log(formData);
        setAppliedFilters(formData);
        setIsFilterDrawerVisible(false);
        setIconColor("green");
    };

    const handleDelete = () => {
        setAppliedFilters(null);
        setIconColor("black");
        onDelete();
    };

    return (
        <>
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
            <Card style={{ width: 350, padding: 0 }} hoverable size={"small"} onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>
                <Flex align="center" justify="center" gap="middle">
                    {!selectedTriggerName && <PlusOutlined />}
                    <span style={{ color: "rgb(11, 47, 115)" }}>{selectedTriggerName || data.label}</span>
                </Flex>

                {!appliedFilters &&  selectedTriggerName && (
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

                {selectedTriggerName && isHovered && (
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
                {/* Applied filters display */}
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
            <span style={{ color: "rgb(11, 47, 115)", fontSize: "10px" }}>
              Applied Job Status: {appliedFilters.jobStatus}
            </span>
                    </div>
                )}

                <Handle type="source" position={Position.Bottom} />
            </Card>

            <Drawer
                title={ "Select a Filter"}
                width={550}
                open={isFilterDrawerVisible}
                onClose={closeDrawer}
            >
                <Form
                    layout="vertical"
                    onFinish={handleFilterSubmit}
                    initialValues={{
                        jobStatus: formData.jobStatus || null,
                    }}
                    style={{
                        backgroundColor: "#f0f2f5",
                        padding: "10px",
                        borderRadius: "10px",
                    }}
                >
                    <Form.Item label="Job Status" name="jobStatus">
                        <Select
                            value={formData.jobStatus || null}
                            onChange={(value) => handleFilterChange(value, "jobStatus")}
                            placeholder="Select Job Status"
                        >
                            <Select.Option value="Open">Send </Select.Option>
                            <Select.Option value="On Hold">On Hold</Select.Option>

                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Apply Filter
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};


const CustomEdge = ({id, sourceX, sourceY, targetX, targetY, iconVisible,}) => {
    const edgePath = `M${sourceX},${sourceY}L${targetX},${targetY}`;

    // Position the icon in the middle of the edge
    const iconX = (sourceX + targetX) / 2 - 12;
    const iconY = (sourceY + targetY) / 2 - 12;
    const { iconColor } = useFilterStore();

    return (
        <g>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                style={{ stroke: "#000", strokeWidth: 2 }}
            />
            {iconVisible && (
                <foreignObject x={iconX} y={iconY} width="24" height="24">
                    <BsFunnelFill style={{ fontSize: "24px", color: iconColor }} />
                </foreignObject>
            )}
        </g>
    );
};


const CustomButton = ({
                          id,
                          sourceX,
                          sourceY,
                          targetX,
                          targetY,
                          setActionDrawerVisible,
                          nodes
                      }) => {
    // Edge path
    const edgePath = `M${sourceX},${sourceY}L${targetX},${targetY}`;
    const [, setIsHovered] = useState(false);

    console.log("nodes",nodes)

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
                        all: "unset",
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
                          {storedAction?.selectedAction?.name || data.label}
                          <span style={{marginLeft: "8px", display: "inline-block"}}>
                             {storedAction?.formData?.dropdownOption}
                          </span>
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
        label: "Edge with Icon",
    },

];


const WorkFlow = ({apiServer, apiKey}) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [, setSelectedNode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [triggers, setTriggers] = useState([]);
    const [formDrawerVisible, setFormDrawerVisible] = useState(false); // For the Form Drawer
    const [actionDrawerVisible, setActionDrawerVisible] = useState(false); // For Action Drawer
    const [, setSelectedBlock] = useState(null);
    const [selectedActions, setSelectedActions] = useState([]);


    // Replace Zustand state with local useState
    const [selectedTriggerName, setSelectedTriggerName] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [formData, setFormData] = useState({});

    // Reset functions
    const resetSelectedAction = () => setSelectedAction(null);
    const resetFormData = () => setFormData({});
    const resetAll = () => {
        setSelectedTriggerName(null);
        setSelectedAction(null);
        setFormData({});
    };

    // const [nodes, setNodes] = useState(() => {
    //     const initialNodes = [
    //         {
    //             id: "1",
    //             type: "addTrigger",
    //             data: {label: selectedTriggerName || "Add Trigger"},
    //             position: {x: 100, y: 200},
    //
    //         },
    //         {
    //             id: "2",
    //             type: "addAction",
    //             data: {
    //                 label:
    //                     "Add a trigger to start building",
    //             },
    //             position: {x: 100, y: 350},
    //         },
    //
    //     ];
    //     return initialNodes;
    //
    // });

    // const [edges, setEdges] = useState(initialEdges);
    const [nodes, setNodes] = useState(() => {
        const savedNodes = localStorage.getItem('nodes');
        return savedNodes ? JSON.parse(savedNodes) : [
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
    });

    const [edges, setEdges] = useState(() => {
        const savedEdges = localStorage.getItem('edges');
        return savedEdges ? JSON.parse(savedEdges) : initialEdges;
    });
    useEffect(() => {
        // Save data to localStorage whenever nodes, edges, selectedAction, formData or nodeCounter change
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
    }, [nodes, edges]);

    const [selectFilter, setSelectFilter] = useState("All");
    const [, setDroppedItem] = useState(null);
    const [iconVisible, setIconVisible] = useState(!!selectedTriggerName);
    const [isFirstNodeUsed, setIsFirstNodeUsed] = useState(false);
    const [nodeCounter, setNodeCounter] = useState(nodes.length);
    console.log("edges",edges)
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const [isFormSaved, setIsFormSaved] = useState(false);

    const [simpleDrawerVisible, setSimpleDrawerVisible] = useState(false);


    useEffect(() => {
        fetchTriggers();
    }, []);

    const fetchTriggers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${apiServer}/api/lookup_automation/triggers`,
                {
                    headers: { Authorization: `Bearer ${apiKey}` },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("data",result)
            if (result && result.data) {
                setTriggers(result.data);
            } else {
                setTriggers([]);
            }
        } catch (error) {
            console.error("Error fetching triggers data: ", error);
        } finally {
            setIsLoading(false);
        }
    };


    const onNodeClick = (_, node) => {
        console.log("Node ID:", node.id); // Log the node's ID for debugging
        setSelectedNodeId(node.id); // Store the clicked node's ID
        if (node.id === "1") {
            if (!selectedTriggerName) {
                // Open Trigger Drawer for Node 1
                setSelectedNode(node);
                setDrawerVisible(true); // Trigger Drawer
                setActionDrawerVisible(false); // Ensure Action Drawer is closed
            }
        } else if (node.id === "2"|| node.type === "addAction") {
            // Node 2 logic
            if (selectedTriggerName) {
                setActionDrawerVisible(true); // Open Action Drawer
                setDrawerVisible(false); // Ensure Trigger Drawer is closed
            } else {
                setDrawerVisible(true); // Open Trigger Drawer
                setActionDrawerVisible(false); // Ensure Action Drawer is closed
            }

            if (isFormSaved) {
                // Open the new simple drawer when Node 2 is clicked after form submission
                setActionDrawerVisible(false);
                setSimpleDrawerVisible(true);
            } else {
                setSelectedNode(node);
            }
        }
    };



    const closeDrawer = () => {
        setDrawerVisible(false);
        setSelectedNode(null);
        setActionDrawerVisible(false)
    };


    useEffect(() => {
        const storedTriggerName = localStorage.getItem('selectedTriggerName');
        if (storedTriggerName) {
            setSelectedTriggerName(storedTriggerName);
        }
    }, []);


    const handleTriggerSelection = (trigger) => {
        const updatedNodes = nodes.map((node) =>
            node.id === selectedNodeId ? { ...node, data: { label: trigger.name } } : node
        );
        setNodes(updatedNodes);
        setSelectedTriggerName(trigger.name);

        localStorage.setItem('selectedTriggerName', trigger.name);

        setDrawerVisible(false);

        setIconVisible(true);
    };

    const handleDragStart = (event, trigger) => {
        closeDrawer();
        event.dataTransfer.setData("text/plain", JSON.stringify(trigger)); // Set the dragged trigger data
        console.log("Dragging started!", trigger);
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
                const updatedNodes = nodes.map((node) => {
                    if (node.id === targetNodeId) {
                        return {
                            ...node,
                            data: { label: draggedTrigger.name },
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes); // Update the nodes state
                setDroppedItem(draggedTrigger.name); // Optionally, update the dropped item display text
                setSelectedTriggerName(draggedTrigger.name)

                // addNewActionNode(draggedTrigger.name)
                console.log(draggedTrigger, "Dropped and updated!");
            } catch (error) {
                console.error("Error parsing the dropped data:", error);
            }
        } else {
            console.error("No data found in drop event.");
        }
    };


    const handleDragOver = (event) => {
        event.preventDefault(); // Allow dropping
    };

    const handleNodeDelete = (event) => {
        if (window.confirm("Are you sure you want to delete these nodes?")) {
            localStorage.removeItem('selectedTriggerName');
            localStorage.removeItem('savedActionData');
            // Filter out all nodes and edges that were added after the trigger
            const initialNodes = ["1", "2"]; // IDs of the initial nodes (Trigger and Instruction)

            // Keep only the initial nodes, and reset their data
            const updatedNodes = nodes.filter((node) => initialNodes.includes(node.id)).map((node) => {
                if (node.id === "1") {
                    return { ...node, data: { label: "Add Trigger" } };
                } else if (node.id === "2") {
                    return {
                        ...node,
                        data: { label: "Add a trigger to start building" }
                    };
                } else {
                    return node;
                }
            });

            // Remove edges that are connected to non-initial nodes
            const updatedEdges = edges.filter(
                (edge) => initialNodes.includes(edge.source) && initialNodes.includes(edge.target)
            );

            // Update state with filtered nodes and edges
            setNodes(updatedNodes);
            setEdges(updatedEdges);

            // Reset other state and UI elements
            resetAll();
            setIconVisible(false);
            setDrawerVisible(true);
            setIsFirstNodeUsed(false)
            setIsFormSaved(false)
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


    // Action node

// Close Action Drawer
    const closeActionDrawer = () => {
        setActionDrawerVisible(false);
        setSelectedBlock(null);
    };



    // Sample action data for the Action Drawer
    const actions = [
        { id: 1, name: 'Send a webhook notification' },
        { id: 2, name: 'Send an email to concerned the users' },
        { id: 3, name: 'Send an email to the job owner' },
    ];


    const createNewNode = (label, nodesLength) => {
        console.log("nodecounter",nodeCounter)
        const newNodeId = `${nodeCounter + 1}`; // Create a new unique ID for each new node
        setNodeCounter((prevCounter)=>prevCounter+1)
        let newNodePositionY = 100;
        let increments = Math.ceil(nodesLength / 2);
        console.log("increments", increments);
        // Add a unique offset for each new node
        newNodePositionY = 250 + (nodesLength - 1) * 100;
        console.log("newNodePositionY", newNodePositionY);

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
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            label: `${selectedAction.name}\n ${formData.dropdownOption}\n`,
        };

        let newNode;
        if (!isFirstNodeUsed) {
            const firstNode = nodes.find((node) => node.id === "2");
            const exitNodePositionY = firstNode.position.y + 130;

            setNodes((prevNodes) => [
                ...prevNodes.map((node) =>
                    node.id === selectedNodeId ? { ...node, data: updatedData } : node
                ),
                { id: "exit", type: "default", data: { label: "Exit" }, position: { x: 258, y: exitNodePositionY } },
            ]);
            setIsFirstNodeUsed(true);

            setEdges((prevEdges) => [
                ...prevEdges.filter((edge) => edge.target !== "exit"), // Remove all edges connected to "exit"
                createNewEdge("2", "exit"),
            ]);
        } else {
            newNode = createNewNode(updatedData.label, nodes.length);

            const lastAddActionNode = nodes
                .filter((node) => node.type === "addAction")
                .slice(-1)[0];

            const newEdge = createNewEdge(lastAddActionNode.id, newNode.id);

            setNodes((prevNodes) => [
                ...prevNodes.filter((node) => node.id !== "exit"), // Remove the old "exit" node
                newNode,
                { id: "exit", type: "default", data: { label: "Exit" }, position: { x: 258, y: newNode.position.y + 130 } },
            ]);

            setEdges((prevEdges) => [
                ...prevEdges.filter((edge) => edge.target !== "exit"), // Remove all edges connected to "exit"
                newEdge,
                createNewEdge(newNode.id, "exit"),
            ]);
        }

        const existingData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const updatedActions = [
            ...existingData,
            { selectedAction, formData, node: newNode || { id: selectedNodeId } },
        ];
        localStorage.setItem("savedActionData", JSON.stringify(updatedActions));

        setIsFormSaved(true);
        setFormDrawerVisible(false);
    };

    const deleteAction = (event) => {
        event.stopPropagation();

        const isConfirmed = window.confirm("Are you sure you want to delete this action?");
        if (!isConfirmed) return;

        const targetElement = event.target.closest("[data-id]");
        const targetNodeId = targetElement?.getAttribute("data-id");
        if (!targetNodeId) return;

        // Filter nodes of type 'addAction'
        const addActionNodes = nodes.filter((node) => node.type === "addAction");
        console.log("addActionNodes", addActionNodes);

        // If only one 'addAction' node remains, display the default label
        if (addActionNodes.length === 1) {
            const updatedNodes = nodes.map((node) =>
                node.id === targetNodeId
                    ? {
                        ...node,
                        data: { ...node.data, label: "Add a trigger to start building" },
                    }
                    : node
            );

            // Remove the "Exit" node since this is the last action node being deleted
            const finalNodes = updatedNodes.filter((node) => node.id !== "exit");

            // Remove edges connected to the Exit node
            const updatedEdges = edges.filter(
                (edge) => edge.source !== "exit" && edge.target !== "exit"
            );

            setIsFirstNodeUsed(false);
            setSelectedAction(null);
            setFormData([]);
            resetSelectedAction();
            resetFormData();
            setNodes(finalNodes);
            setEdges(updatedEdges);

            // Update localStorage with the new nodes and edges
            const savedData = JSON.parse(localStorage.getItem("savedActionData")) || [];
            const updatedData = savedData.filter((item) => item.node.id !== targetNodeId); // Remove deleted action data
            localStorage.setItem("savedActionData", JSON.stringify(updatedData));

        } else {
            // If there are more than one 'addAction' node, remove the target node
            const deletedNode = nodes.find((node) => node.id === targetNodeId);
            if (!deletedNode) return;

            // Remove the deleted node and its edges
            const updatedNodes = nodes.filter((node) => node.id !== targetNodeId);
            const updatedEdges = edges.filter(
                (edge) => edge.source !== targetNodeId && edge.target !== targetNodeId
            );

            // Adjust positions of nodes below the deleted node
            const adjustedNodes = updatedNodes.map((node) => {
                if (node.position.y > deletedNode.position.y) {
                    return {
                        ...node,
                        position: {
                            ...node.position,
                            y: node.position.y - 100, // Adjust by node height + spacing
                        },
                    };
                }
                return node;
            });

            // Update the position of the existing "Exit" node
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

            // Update localStorage with the new nodes and edges
            const savedData = JSON.parse(localStorage.getItem("savedActionData")) || [];
            const updatedData = savedData.filter((item) => item.node.id !== targetNodeId); // Remove deleted action data
            localStorage.setItem("savedActionData", JSON.stringify(updatedData));
        }
    };

// Your other logic follows here
    const handleActionSelection = (action) => {
        setSelectedActions((prevActions) => [...prevActions, action]);
        // Set the selected action
        setSelectedAction(action);
        setActionDrawerVisible(false)
        // Open the Form Drawer immediately after selecting an action
        setFormDrawerVisible(true);
        // setNodeCounter((prevCount) => prevCount + 1);
    };


    const closeFormDrawer = () => {
        setFormDrawerVisible(false);

    };
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleActionDragStart = (event, action) => {
        closeActionDrawer(); // Close the drawer when dragging starts
        event.dataTransfer.setData("text/plain", JSON.stringify(action)); // Set the dragged trigger data
        console.log("Dragging started!", action);
    };

    const handleActionDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActionDrawerVisible(true);
        console.log("event", event);
        const data = event.dataTransfer.getData("text/plain");
        console.log("data", data);

        if (data) {
            try {
                const action = JSON.parse(data);

                // If it's the first action, update Node 2's label
                if (selectedActions.length === 0) {
                    setNodes((prevNodes) =>
                        prevNodes.map((node) =>
                            node.id === selectedNodeId
                                ? {
                                    ...node,
                                    data: {
                                        ...node.data,
                                        label: `${action.name}`,
                                    },
                                }
                                : node
                        )
                    );
                } else {
                    // Use the utility function to create a new node for subsequent actions
                    const newNode = createNewNode(action, nodes.length);

                    // Add the new node to the nodes array
                    setNodes((prevNodes) => [...prevNodes, newNode]);

                    // If there is a previous node, create an edge to the new node
                    const lastNodeId = nodes[nodes.length - 1].id;
                    const newEdge = createNewEdge(lastNodeId, newNode.id);
                    setEdges((prevEdges) => [...prevEdges, newEdge]);
                }

                // Add the action to the selected actions array
                setSelectedActions((prevActions) => [...prevActions, action]);

                // Set the selected action
                setSelectedAction(action);

                setActionDrawerVisible(false)
                // Immediately open the form drawer after setting the action
                setFormDrawerVisible(true);

                console.log("Dropped action and updated node:", action);
            } catch (error) {
                console.error("Error parsing the dropped data:", error);
            }
        } else {
            console.error("No data found in drop event.");
        }
    };

    const handleActionDragOver  = (event) => {
        event.preventDefault();
    };

    const handleActionChange = (e) => {
        const actionId = e.target.value;

        const action = actions.find((action) => action.id === parseInt(actionId));
        setSelectedAction(action); // Update selected action
    };


    const closeSimpleDrawer = () => setSimpleDrawerVisible(false);

    const handleSubmit = () => {
        const updatedLabel = `${selectedAction.name}\n${formData.dropdownOption}`;

        // Update only the selected node's label
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === selectedNodeId // Ensure you update only the node with selectedNodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data, // Keep other properties in data
                            label: updatedLabel // Update only the label
                        }
                    }
                    : node
            )
        );

        // Update localStorage for the specific selectedNodeId, along with selectedAction and formData
        const existingData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const updatedActions = existingData.map((action) =>
            action.node.id === selectedNodeId
                ? {
                    ...action,
                    label: updatedLabel, // Update the label
                    selectedAction, // Update selectedAction
                    formData // Update formData
                }
                : action
        );
        // Save updated data in localStorage
        localStorage.setItem("savedActionData", JSON.stringify(updatedActions));

        console.log("Updated Node Label:", updatedLabel);
        console.log("Updated Actions Stored in LocalStorage:", updatedActions);

        closeSimpleDrawer();
    };


    return (
        <div style={{ height: "90vh", verticalAlign: "top" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                nodeTypes={{
                    addTrigger: (props) => (
                        <AddTriggerNode {...props} onDelete={handleNodeDelete} selectedTriggerName={selectedTriggerName} />
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
                        <CustomEdge {...props} iconVisible={iconVisible} />
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
                <div style={{ padding: '20px' }}>
                    <p>Fill in the details for the selected action:</p>
                    <form onSubmit={handleFormSubmit}>
                        {/* Dropdown 1 */}
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Select an Option</label>
                            <select
                                name="dropdownOption"
                                value={formData.dropdownOption}
                                onChange={handleFormChange}
                                style={{ width: '100%', padding: '8px' }}
                            >
                                <option value="">
                                    Choose an option
                                </option>
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            style={{
                                backgroundColor: 'rgb(11, 47, 115)',
                                color: '#fff',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </Drawer>

            {/* Simple Drawer with Editable Fields */}
            <Drawer
                title="Simple Drawer"
                width={550}
                open={simpleDrawerVisible}
                onClose={closeSimpleDrawer}
            >
                <div style={{ padding: '20px' }}>
                    {/* Editable Action Dropdown */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Select Action</label>
                        <select
                            value={selectedAction?.id || ''}
                            onChange={handleActionChange}
                            style={{ width: '100%', padding: '8px' }}
                        >
                            <option value="">Choose an action</option>
                            {actions.map((action) => (
                                <option key={action.id} value={action.id}>
                                    {action.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Editable Form Data */}
                    {selectedAction && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Select an Option</label>
                            <select
                                name="dropdownOption"
                                value={formData.dropdownOption}
                                onChange={handleFormChange}
                                style={{ width: '100%', padding: '8px' }}
                            >
                                <option value="">Choose an option</option>
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                                <option value="Option 3">Option 3</option>
                            </select>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div style={{ marginTop: '20px' }}>
                        <button
                            onClick={handleSubmit}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Drawer>

        </div>
    );
};

export default WorkFlow;