import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Handle, Position } from "react-flow-renderer";
import { Drawer, Segmented, Spin } from "antd";
import {  PlusOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { MdDelete } from "react-icons/md";
import { Button, Form, Select } from "antd";
import { IoIosFlash } from "react-icons/io";
import { VscRunCoverage } from "react-icons/vsc";
import { GrTrigger } from "react-icons/gr";
import { BsFunnelFill } from "react-icons/bs";
const { Option } = Select;
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


const AddTriggerNode = ({ data, onDelete }) => {
    const isDefaultLabel = data.label === "Add Trigger";
    const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
    const [, setIsTriggerDrawerVisible] = useState(false);
    const [formData, setFormData] = useState({ jobStatus: "" });

    const { appliedFilters, setAppliedFilters, setIconColor } = useFilterStore()
    // const { setAppliedActions ,setSelectedAction } = useActionStore();

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
            <Card style={{ width: 350, padding: 0 }} hoverable size={"small"}>
                <Flex align="center" justify="center" gap="middle">
                    {isDefaultLabel && <PlusOutlined />}
                    <span style={{ color: "rgb(11, 47, 115)" }}>{data.label}</span>
                </Flex>

                {!appliedFilters && !isDefaultLabel && (
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

                {!isDefaultLabel && (
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
                            marginTop: 10,
                            backgroundColor: "#f0f2f5",
                            padding: "5px 15px",
                            borderRadius: "10px",
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


const CustomEdge = ({
                        id,
                        sourceX,
                        sourceY,
                        targetX,
                        targetY,
                        iconVisible,
                    }) => {
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



const AddActionNode = ({data,deleteAction,selectedAction,handleActionDrop,handleActionDragOver}) => {


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
            <Card style={{width: 350, padding: 0, border: '1px dashed #dadada'}} hoverable size={'small'}
                  onDrop={handleActionDrop}
                  onDragOver={handleActionDragOver}
            >
                <div>
                    <Handle type="target" position={Position.Top}/>
                    <Flex align={"center"} justify={"center"} gap={"middle"}>
                        <span style={{fontSize: '14px', color: "#888888"}}>{data.label}</span></Flex>
                    {selectedAction && (
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
                    <Handle type="source" position={Position.Bottom}/>
                </div>
            </Card>
        </>
    );
};




// Zustand store for trigger name, selected action, and form data persistence
const useTriggerStore = create(
    persist(
        (set) => ({
            selectedTriggerName: null, // Store trigger name
            selectedAction: null, // Store selected action
            formData: {}, // Store form data

            setSelectedTriggerName: (name) => set({ selectedTriggerName: name }),
            resetTriggerName: () => set({ selectedTriggerName: null }),

            setSelectedAction: (action) => set({ selectedAction: action }),
            resetSelectedAction: () => set({ selectedAction: null }),

            setFormData: (data) => set({ formData: data }),
            resetFormData: () => set({ formData: {} }),

            resetAll: () => set({ selectedTriggerName: null, selectedAction: null, formData: {} })
        }),
        {
            name: "trigger-store",
        }
    )
);




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
    // const [selectedAction, setSelectedAction] = useState(null);
    // const [formData, setFormData] = useState({
    //     dropdownOption: '', // Store selected dropdown option
    //
    // });
    const [actionDrawerVisible, setActionDrawerVisible] = useState(false); // For Action Drawer
    const [, setSelectedBlock] = useState(null);
    const [selectedActions, setSelectedActions] = useState([]);
    // const {selectedTriggerName, setSelectedTriggerName, resetTriggerName} = useTriggerStore();
    const {
        selectedTriggerName,
        selectedAction,
        formData,
        setSelectedTriggerName,
        setSelectedAction,
        setFormData,
        resetAll
    } = useTriggerStore();


    const [nodes, setNodes] = useState(() => {
        const initialNodes = [
            {
                id: "1",
                type: "addTrigger",
                data: {label: selectedTriggerName || "Add Trigger"},
                position: {x: 100, y: 200},
            },
            {
                id: "2",
                type: "addAction",
                data: {
                    label:
                        "Drag and drop to start building, or add a block from the connector line",
                },
                position: {x: 100, y: 300},
            },

        ];
        return initialNodes;

    });


    const [selectFilter, setSelectFilter] = useState("All");
    const [, setDroppedItem] = useState(null);
    const [iconVisible, setIconVisible] = useState(!!selectedTriggerName);
    const [edges, setEdges] = useState(initialEdges);

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
        if (node.id === "1") {
            if (!selectedTriggerName) {
                // Open Trigger Drawer for Node 1
                setSelectedNode(node);
                setDrawerVisible(true); // Trigger Drawer
                setActionDrawerVisible(false); // Ensure Action Drawer is closed
            }
        } else {
            // Node 2 logic
            if (selectedTriggerName) {
                setActionDrawerVisible(true); // Open Action Drawer
                setDrawerVisible(false); // Ensure Trigger Drawer is closed
            } else {
                setDrawerVisible(true); // Open Trigger Drawer
                setActionDrawerVisible(false); // Ensure Action Drawer is closed
            }
            setSelectedNode(node);
        }
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
        setSelectedNode(null);
        setActionDrawerVisible(false)
    };



    const handleTriggerSelection = (trigger) => {
        const updatedNodes = nodes.map((node) =>
            node.id === "1" ? { ...node, data: { label: trigger.name } } : node
        );
        setNodes(updatedNodes);
        setSelectedTriggerName(trigger.name);
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
            // Filter out all nodes and edges that were added after the trigger
            const initialNodes = ["1", "2"]; // IDs of the initial nodes (Trigger and Instruction)

            // Keep only the initial nodes, and reset their data
            const updatedNodes = nodes.filter((node) => initialNodes.includes(node.id)).map((node) => {
                if (node.id === "1") {
                    return { ...node, data: { label: "Add Trigger" } };
                } else if (node.id === "2") {
                    return {
                        ...node,
                        data: { label: "Drag and drop to start building, or add a block from the connector line" }
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
        { id: 1, name: 'Send Email' },
        { id: 2, name: 'Create Task' },
        { id: 3, name: 'Update CRM' },
    ];



// Your other logic follows here
    const handleActionSelection = (action) => {
        let newNode, newEdge;

        // If this is the first action selection, update Node 2's label
        if (selectedActions.length === 0) {
            // Update Node 2 with the first selected action's label
            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === '2'
                        ? {
                            ...node,
                            data: {
                                ...node.data,
                                label: `${action.name}`, // Set the label to the first selected action
                            },
                        }
                        : node
                )
            );
        } else {
            // Create a new node
            newNode = createNewNode(action.name, nodes.length);

            // Update nodes array with the new node
            setNodes((prevNodes) => {
                const updatedNodes = [...prevNodes, newNode];

                // Create an edge connecting the previous node to the new node
                const sourceNodeId = nodes.length === 2 ? '2' : prevNodes[prevNodes.length - 1].id;
                newEdge = createNewEdge(sourceNodeId, newNode.id);

                // Add the new edge to the edges array
                setEdges((prevEdges) => [...prevEdges, newEdge]);

                return updatedNodes;
            });
        }

        // Add the action to the selected actions array
        setSelectedActions((prevActions) => [...prevActions, action]);

        // Set the selected action
        setSelectedAction(action);

        // Open the Form Drawer immediately after selecting an action
        setFormDrawerVisible(true);
    };

    const createNewEdge = (sourceNodeId, targetNodeId) => {
        return {
            id: `e${sourceNodeId}-${targetNodeId}`,
            source: sourceNodeId,
            target: targetNodeId,
            animated: false,
            style: { stroke: '#d7d9e1', strokeWidth: 1 },
        };
    };

    const createNewNode = (label, nodesLength) => {
        const newNodeId = `${nodesLength + 1}`; // Create a new unique ID for each new node

        let newNodePositionY = 100;

        if(nodesLength<=3) {
            newNodePositionY= 100 + nodesLength * 100; // Dynamically calculate the position
        }else if(nodesLength===4) {
            newNodePositionY =  (nodesLength * 100) +100; // Dynamically calculate the position
        }else{
            let increments = Math.ceil((nodesLength - 3) / 2);
            newNodePositionY = 400 + increments * 100;
        }
        console.log("newNodePositionY",newNodePositionY,"nodesLength",nodesLength)
        return {
            id: newNodeId,
            type: 'addAction',
            data: { label: label },
            position: { x: 100, y: newNodePositionY }, // Dynamically position nodes
        };
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (selectedActions.length > 0) {
            const lastActionNodeId = nodes[nodes.length - 1].id;
            const lastNode = nodes[nodes.length - 1];

            // Update the label for the last action node with form data
            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === lastActionNodeId
                        ? {
                            ...node,
                            data: {
                                ...node.data,
                                label: `${selectedActions[selectedActions.length - 1]?.name || ''}\n ${formData.dropdownOption}`, // Update the label with form data
                            },
                            position: {
                                x: lastNode.position.x , // Adjust X position as needed
                                y: lastNode.position.y , // Adjust Y position as needed
                            },
                        }
                        : node
                )
            );


            // const exitNodePositionY = lastNode.position.y + 100;
            const exitNodePositionY = lastNode.position.y + 100;
            // Ensure the Exit node is present
            setNodes((prevNodes) => [
                ...prevNodes,
                {
                    id: 'exit',
                    type: 'default',
                    data: { label: 'Exit Node' },
                    position: { x: 200, y: exitNodePositionY }, // Position of the Exit node below the last node
                }
            ]);

            // Create an edge from the last node to the Exit node
            const newEdge = createNewEdge(lastActionNodeId, 'exit');
            setEdges((prevEdges) => [...prevEdges, newEdge]);
        }

        // Close the form drawer and action drawer
        setFormDrawerVisible(false);
        setActionDrawerVisible(false);
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

    const deleteAction = (event) => {
        event.stopPropagation();

        // Show confirmation alert before proceeding with delete action
        const isConfirmed = window.confirm("Are you sure you want to delete this action?");

        if (isConfirmed) {
            const targetElement = event.target.closest("[data-id]");
            const targetNodeId = targetElement?.getAttribute("data-id");

            if (!targetNodeId) return; // If no targetNodeId is found, exit

            // Remove the node from the nodes array (but never remove Node 2)
            const updatedNodes = nodes.filter((node) => node.id !== targetNodeId || node.id === "2");

            // Find the previous and next nodes (if they exist)
            const targetNodeIndex = nodes.findIndex((node) => node.id === targetNodeId);
            const prevNodeId = targetNodeIndex > 0 ? nodes[targetNodeIndex - 1].id : null;
            const nextNodeId = targetNodeIndex < nodes.length - 1 ? nodes[targetNodeIndex + 1].id : null;

            // If there is a previous node and a next node, create a new edge between them
            let updatedEdges = edges.filter(
                (edge) => edge.source !== targetNodeId && edge.target !== targetNodeId
            );

            if (prevNodeId && nextNodeId) {
                const newEdge = {
                    id: `e${prevNodeId}-${nextNodeId}`,
                    source: prevNodeId,
                    target: nextNodeId,
                    animated: false,
                    style: { stroke: '#d7d9e1', strokeWidth: 1 },
                };
                updatedEdges.push(newEdge);
            }

            // Update Node 2's label if all action nodes are deleted
            if (updatedNodes.length === 1 && updatedNodes[0].id === "1") {
                const updatedNode2 = nodes.find((node) => node.id === "2");
                updatedNode2.data.label =
                    "Drag and drop to start building, or add a block from the connector line";
                if (!updatedNodes.some((node) => node.id === "2")) {
                    updatedNodes.push(updatedNode2);
                }
            }

            setNodes(updatedNodes); // Update the nodes state
            setEdges(updatedEdges); // Update the edges state
        }
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
                            node.id === '2'
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
        event.preventDefault(); // Allow dropping
    };

    return (
        <div style={{ height: "90vh", verticalAlign: "top" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                nodeTypes={{
                    addTrigger: (props) => (
                        <AddTriggerNode {...props} onDelete={handleNodeDelete} />
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

                        />
                    )
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                edgeTypes={{
                    custom: (props) => (
                        <CustomEdge {...props} iconVisible={iconVisible} />
                    ),
                }}
                fitView
            >
                <Controls />
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

                {/* Form Drawer within the Action Drawer */}
                {formDrawerVisible && (
                    <div
                        style={{
                            backgroundColor: '#fff',
                            marginTop: '20px',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h3>Configure {selectedAction?.name || ''}</h3>
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
                                    <option value="" disabled>
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
                )}
            </Drawer>

        </div>
    );
};

export default WorkFlow;