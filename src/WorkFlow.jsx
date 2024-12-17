import React, { useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Handle,
  Position,
  Background,
} from "react-flow-renderer";
import { Drawer, Segmented, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";

import { Button, Form, Input, Select } from "antd";

const AddTriggerNode = ({ data }) => {
  const isDefaultLabel = data.label === "Add Trigger";
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false); // State for filter drawer
  const [isTriggerDrawerVisible, setIsTriggerDrawerVisible] = useState(false); // State for trigger drawer
  const [formData, setFormData] = useState({ filter: "" }); // State for form data

  const handleFilterDrawerOpen = () => {
    setIsFilterDrawerVisible(true); // Open filter drawer
    setIsTriggerDrawerVisible(false); // Close trigger drawer when filter is opened
  };

  const closeDrawers = () => {
    setIsTriggerDrawerVisible(false); // Close trigger drawer
    setIsFilterDrawerVisible(false); // Close filter drawer
  };

  const handleFilterChange = (value) => {
    setFormData({ ...formData, filter: value });
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
    setIsFilterDrawerVisible(false); // Optionally close filter drawer after submission
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(199, 220, 252)",
          padding: "3px 8px",
          borderRadius: 16,
          marginBottom: 7,
          display: "inline-block",
        }}
      >
        <Flex gap={2}>
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
      <Card style={{ width: 350, padding: 0 }} hoverable size="small">
        <Flex align="center" justify="center" gap="middle">
          {isDefaultLabel && <PlusOutlined />}
          <span style={{ color: "rgb(11, 47, 115)" }}>{data.label}</span>
        </Flex>
        <Handle type="source" position={Position.Bottom} />
      </Card>

      {!isDefaultLabel && (
        <div style={{ marginTop: 10 }}>
          <Button type="default" onClick={handleFilterDrawerOpen}>
            Filters
          </Button>
        </div>
      )}

      {/* Filter Drawer */}
      <Drawer
        title="Apply Filter"
        width={400}
        open={isFilterDrawerVisible}
        onClose={closeDrawers}
      >
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={formData}
          style={{
            backgroundColor: "#f0f2f5",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Form.Item label="Filter" name="filter">
            <Select
              value={formData.filter}
              onChange={handleFilterChange}
              placeholder="Select a filter"
            >
              <Select.Option value="filter1">Filter 1</Select.Option>
              <Select.Option value="filter2">Filter 2</Select.Option>
              <Select.Option value="filter3">Filter 3</Select.Option>
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
      <div
        style={{
          backgroundColor: "rgb(199, 220, 252)",
          padding: "3px 8px",
          borderRadius: 16,
          marginBottom: 7,
          display: "inline-block",
        }}
      >
        <Flex gap={2}>
          <span
            style={{
              color: "rgb(11, 47, 115)",
              fontWeight: "medium",
              fontSize: "14px",
            }}
          >
            Then do this
          </span>
        </Flex>
      </div>
      <Card
        style={{ width: 350, padding: 0, border: "1px dashed #dadada" }}
        hoverable
        size="small"
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

// Node Types
const nodeTypes = {
  addTrigger: AddTriggerNode,
  addAction: AddActionNode,
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
    animated: true,
  },
];

const WorkFlow = ({ apiServer, apiKey }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [triggers, setTriggers] = useState([]);
  const [nodes, setNodes] = useState(initialNodes);
  const [selected, setSelected] = useState(null);
  const [selectFilter, setSelectFilter] = useState("All");
  const [triggerSelected, setTriggerSelected] = useState(false); // Track if a trigger has been selected

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
      console.log("result", result);

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
    setTriggerSelected(true); // Set trigger as selected
  };

  const handleDeleteTrigger = () => {
    const updatedNodes = nodes.map((node) =>
      node.id === "1" ? { ...node, data: { label: "Add Trigger" } } : node
    );
    setNodes(updatedNodes);
    setTriggerSelected(false); // Reset trigger selection
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
        nodes={nodes.map((node) =>
          node.id === "1"
            ? {
                ...node,
                data: { ...node.data, onDeleteTrigger: handleDeleteTrigger },
              }
            : node
        )}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <Drawer
        title={selected ? `${selectedBlock.data.label}` : "Triggers"}
        width={550}
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
                >
                  <div>
                    <Flex gap={"middle"}>
                      <span>{trigger.name}</span>
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
