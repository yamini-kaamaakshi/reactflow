import React, { useEffect, useState } from "react";
import ReactFlow, { Controls, Handle, Position } from "react-flow-renderer";
import { Drawer, Segmented, Spin } from "antd";
import { FundOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";
import { MdDelete } from "react-icons/md";
import { Button, Form, Select } from "antd";
import { IoIosFlash } from "react-icons/io";
import { VscRunCoverage } from "react-icons/vsc";
import { GrTrigger } from "react-icons/gr";
import { BsFunnelFill } from "react-icons/bs";

const AddTriggerNode = ({ data, onDelete }) => {
  const isDefaultLabel = data.label === "Add Trigger";
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
  const [, setIsTriggerDrawerVisible] = useState(false);
  const [formData, setFormData] = useState({ jobStatus: "" });
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [selectedTriggerName] = useState("");

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
        title={selectedTriggerName || "Select a Trigger"}
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
              <Select.Option value="Open">Open</Select.Option>
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

const AddActionNode = ({ data }) => {
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
          </Flex>
        </div>
      </span>
      <Card
        style={{ width: 350, padding: 0, border: "1px dashed #dadada" }}
        hoverable
        size={"small"}
      >
        <Handle type="target" position={Position.Top} />
        <Flex align="center" justify="center" gap="middle">
          <span style={{ fontSize: "14px", color: "#888888" }}>
            {data.label}
          </span>
        </Flex>
        <Handle type="source" position={Position.Bottom} />
      </Card>
    </>
  );
};

const initialNodes = [
  {
    id: "1",
    type: "addTrigger",
    data: { label: "Add Trigger" },
    position: { x: 200, y: 100 },
  },
  {
    id: "2",
    type: "addAction",
    data: {
      label:
        "Drag and drop to start building, or add a block from the connector line",
    },
    position: { x: 200, y: 300 },
  },
];

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
          <BsFunnelFill />
        </foreignObject>
      )}
    </g>
  );
};

const WorkFlow = ({ apiServer, apiKey }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [triggers, setTriggers] = useState([]);
  const [nodes, setNodes] = useState(initialNodes);
  const [selected] = useState(null);
  const [selectFilter, setSelectFilter] = useState("All");
  const [triggerSelected, setTriggerSelected] = useState(false);

  const [, setDroppedItem] = useState(null);
  const [iconVisible, setIconVisible] = useState(false);

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
    if (!triggerSelected) {
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
    setDrawerVisible(false);
    setTriggerSelected(true);
    setIconVisible(true);
  };

  const handleDragStart = (event, trigger) => {
    closeDrawer(); // Close the drawer when dragging starts
    event.dataTransfer.setData("text/plain", JSON.stringify(trigger)); // Set the dragged trigger data
    console.log("Dragging started!", trigger);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    setIconVisible(true);
    setDrawerVisible(false);
    setTriggerSelected(true);
    if (data) {
      try {
        const draggedTrigger = JSON.parse(data);

        const updatedNodes = nodes.map((node) => {
          if (node.id === "1") {
            return {
              ...node,
              data: { label: draggedTrigger.name },
            };
          }
          return node;
        });

        setNodes(updatedNodes); // Update the nodes state
        setDroppedItem(draggedTrigger.name); // Optionally, update the dropped item display text
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

  const handleNodeDelete = () => {
    if (window.confirm("Are you sure you want to delete this node?")) {
      const updatedNodes = nodes.map((node) =>
        node.id === "1" ? { ...node, data: { label: "Add Trigger" } } : node
      );
      setNodes(updatedNodes);
      setTriggerSelected(false);
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
        edges={initialEdges}
        onNodeClick={onNodeClick}
        nodeTypes={{
          addTrigger: (props) => (
            <AddTriggerNode {...props} onDelete={handleNodeDelete} />
          ),
          addAction: AddActionNode,
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
        title={selected ? `${selectedBlock.data.label}` : "Triggers"}
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
                  onDragStart={(event) => handleDragStart(event, trigger)} // Ensure trigger is passed here
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
