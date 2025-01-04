import  { useEffect, useState } from "react";
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
  const { setAppliedActions ,setSelectedAction } = useActionStore();

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
    setAppliedActions(null);
    setSelectedAction(null)
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

const useActionStore = create(
    persist(
        (set) => ({
            selectedAction: null,
            setSelectedAction: (action) => set({ selectedAction: action }),
            resetSelectedAction: () => set({ selectedAction: null }),
            appliedActions: null,
            setAppliedActions: (filters) => set({ appliedActions: filters }),
            resetAppliedActions: () => set({ appliedActions: null }),
        }),
        {
            name: 'selected-action', // Name of the storage key
            getStorage: () => localStorage, // Ensure persistence uses localStorage
        }
    )
);


const AddActionNode = ({ id, data, setNodes, nodes,setEdges }) => {
    const [actionDrawerVisible, setActionDrawerVisible] = useState(false);  // Drawer for action selection
    const [formDrawerVisible, setFormDrawerVisible] = useState(false);      // Drawer for the form with dropdown
    const [formValues, setFormValues] = useState({ dropdown: "" });        // Form values state

    const { selectedAction, setSelectedAction,setAppliedActions,resetSelectedAction,resetAppliedActions } = useActionStore();


    const handleActionSelection = (action) => {
        console.log("Selected action:", action);

        // If an action is already selected, create a new node
        if (selectedAction) {
            // Create a new node
            const newNode = {
                id: `${nodes.length + 1}`,  // Unique id for the new node
                type: "addAction",
                data: { label: action, formData: "" },  // New node with action label
                position: { x: 100, y: 300 + (nodes.length * 100) },  // Dynamic positioning for spacing
                isNewNode: true,
            };

            // Add the new node to the existing nodes list
            setNodes((prevNodes) => {
                const updatedNodes = [...prevNodes, newNode];

                // Add an edge between the previous node and the new node
                const newEdge = {
                    id: `edge-${prevNodes.length + 1}`,  // Unique edge id
                    source: prevNodes[prevNodes.length - 1].id,  // Source node (last node)
                    target: newNode.id,  // Target node (new node)

                };

                setEdges((prevEdges) => [...prevEdges, newEdge]);  // Add the new edge to the edges list
                return updatedNodes;
            });

        } else {

            setSelectedAction(action);
            setNodes((prevNodes) => {
                const updatedNodes = prevNodes.map((node) =>
                    node.id === id
                        ? { ...node, data: { ...node.data, label: action } }
                        : node
                );
                console.log("Updated nodes with action label:", updatedNodes);
                return updatedNodes;
            });
        }

        setActionDrawerVisible(false);
    };

    const handleFormSubmit = () => {
        console.log("Form values:", formValues); // Log form values before submission

        // Update the node with the form data (e.g., selected dropdown option)
        setNodes((prevNodes) => {
            const updatedNodes = prevNodes.map((node) =>
                node.id === id
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            formData: formValues.dropdown, // Store form data in the node
                        },
                    }
                    : node
            );
            console.log("Updated nodes with form data:", updatedNodes);
            return updatedNodes;
        });

        // Close the form drawer after submission
        setFormDrawerVisible(false);
    };

    // Effect to open the form drawer when an action is selected
    useEffect(() => {
        if (selectedAction) {
            setFormDrawerVisible(true);
        }
    }, [selectedAction]);

    const closeActionDrawer = () => {
        setActionDrawerVisible(false);
    };

    const deleteAction = (event) => {
        // Show confirmation alert before proceeding with delete action
        const isConfirmed = window.confirm("Are you sure you want to delete this action?");

        if (isConfirmed) {
            // Clear selected and applied actions
            setSelectedAction(null);
            setAppliedActions(null);
            resetSelectedAction();
            resetAppliedActions();

            // Get the target element's ID from the event
            const targetElement = event.target.closest("[data-id]");
            const targetNodeId = targetElement?.getAttribute("data-id");

            // Update the nodes with the new label
            const updatedNodes = nodes.map((node) => {
                if (node.id === targetNodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: "Drag and drop to start building, or add a block from the connector line",
                        },
                    };
                }
                return node;
            });

            // Update the nodes state with the new label
            setNodes(updatedNodes);

            // Additional UI handling: Ensure the selected actions are cleared in the UI
            // You can also reset any other UI-related state that depends on `selectedAction` or `appliedActions`
        }
    };


    const onDragStart = (e, action) => {
        closeActionDrawer();
        e.dataTransfer.setData("text/plain", JSON.stringify(action));  // Store action in the drag event
    };

    const onDrop = (e) => {
        e.preventDefault();

        e.stopPropagation();

        console.log("event", e);
        const data = e.dataTransfer.getData("text/plain");
        console.log("data", data);

        if (data) {
            try {
                const action = JSON.parse(data);
                setSelectedAction(action);
                handleActionSelection(action)
                console.log("Dropped action and updated node:", action);
            } catch (error) {
                console.error("Error parsing the dropped data:", error);
            }
        } else {
            console.error("No data found in drop event.");
        }
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
                   {data.isNewNode ? null : (
                       <div style={{ display: 'flex', gap: 2 }}>
                           <VscRunCoverage color={"rgb(11, 47, 115)"} size={16} />
                           <span
                               style={{
                                   fontSize: "14px",
                                   color: "rgb(11, 47, 115)",
                                   fontWeight: "medium",
                               }}
                           >
                        Then do this
                    </span>
                       </div>
                   )}

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
                size={"small"}
                onClick={() => setActionDrawerVisible(true)} // Open the action drawer when clicked
                onDrop={onDrop}

            >
                <div>
                    <Handle type="target" position={Position.Top} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span style={{ fontSize: "14px", color: "#888888" }}>
                            {data.label}
                        </span>
                        {data.formData && (
                            <div style={{marginLeft: "20px",}}>
                                { data.formData}
                            </div>
                        )}
                    </div>
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
                    <Handle type="source" position={Position.Bottom} />
                </div>
            </Card>

            {/* First Drawer: Action Selection */}
            <Drawer
                title={"Select an Action"}
                width={580}
                open={actionDrawerVisible}
                onClose={() => setActionDrawerVisible(false)} // Close the action drawer
            >
                <div style={{ backgroundColor: "#f0f2f5", padding: "10px", borderRadius: "10px" }}>
                    {["Send an email webhook", "Send a webhook notification"].map((action, index) => (
                        <Card
                            key={index}
                            style={{
                                marginBottom: "14px",
                                cursor: "pointer",
                                backgroundColor: selectedAction === action ? "#e0e0e0" : "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                padding: "10px",
                            }}
                            onClick={() => handleActionSelection(action)} // Handle action selection
                            draggable
                            onDragStart={(e) => onDragStart(e, action)} // Enable dragging
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "20px", color: "#0070f3" }}>⚡</span>
                                <p style={{ margin: 0 }}>{action}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </Drawer>

            {/* Second Drawer: Form with Dropdown */}
            <Drawer
                title={"Configure Action"}
                width={580}
                open={formDrawerVisible}
                onClose={() => setFormDrawerVisible(false)} // Close the form drawer
            >
                <Form layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        label="Choose an Option"
                        name="dropdown"
                        rules={[{ required: true, message: "Please select an option" }]} >
                        <Select
                            value={formValues.dropdown}
                            onChange={(value) => setFormValues({ ...formValues, dropdown: value })}
                        >
                            <Select.Option value="option1">Option 1</Select.Option>
                            <Select.Option value="option2">Option 2</Select.Option>
                            <Select.Option value="option3">Option 3</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

// Zustand store for trigger name persistence
const useTriggerStore = create(
    persist(
        (set) => ({
          selectedTriggerName: null, // Store trigger name
          setSelectedTriggerName: (name) => set({ selectedTriggerName: name }),
          resetTriggerName: () => set({ selectedTriggerName: null }),
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
  const {selectedTriggerName, setSelectedTriggerName, resetTriggerName} =
      useTriggerStore();


  const [nodes, setNodes] = useState(() => {
    const initialNodes = [
      {
        id: "1",
        type: "addTrigger",
        data: {label:  selectedTriggerName || "Add Trigger"},
        position: {x: 100, y: 200},
      },
      {
        id: "2",
        type: "addAction",
        data: {
          label:
              "Drag and drop to start building, or add a block from the connector line",
        },
        position: {x: 100, y: 400},
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
    if (!selectedTriggerName) {
      setSelectedNode(node);
      setDrawerVisible(true);
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedNode(null);
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

    if (window.confirm("Are you sure you want to delete these nodes?"))
    {
      const updatedNodes = nodes.map((node) => {
        if (node.id === "1") {
          return { ...node, data: { label: "Add Trigger" }
          };
        } else if (node.id === "2") {
          return { ...node, data: { label: "Drag and drop to start building, or add a block from the connector line" }
          };
        } else {
          return node;
        }
      });
      setNodes(updatedNodes);
      resetTriggerName();
      setIconVisible(false);
      setDrawerVisible(true);
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
                  <AddActionNode {...props} nodes={nodes} setNodes={setNodes} setEdges={setEdges} />
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
      </div>
  );
};

export default WorkFlow;