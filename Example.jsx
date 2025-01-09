
import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, addEdge } from 'react-flow-renderer';
import { Drawer, Card, CardContent, Box, Typography, TextField, Button } from '@mui/material';

const FlowComponent = () => {
    const [nodes, setNodes] = useState([
        {
            id: '1',
            type: 'default',
            position: { x: 250, y: 25 },
            data: { label: 'Node 1' },
        },
    ]);
    const [edges, setEdges] = useState([]);
    const [openActionDrawer, setOpenActionDrawer] = useState(false);
    const [openFormDrawer, setOpenFormDrawer] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedNode, setSelectedNode] = useState();
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [clickedCards, setClickedCards] = useState({ card1: false, card2: false });
    const [nodeCounter, setNodeCounter] = useState(2); // Start node counter at 2 for new nodes after Node 1
    const [isFirstNodeUsed, setIsFirstNodeUsed] = useState(false);

    // Function to handle adding new nodes based on the selected action
    const addNode = (cardLabel, cardKey) => {
        if (!clickedCards[cardKey]) {
            setSelectedAction(cardLabel); // Set the selected action
            setOpenActionDrawer(false); // Close the action drawer after selecting action
            setOpenFormDrawer(true); // Open the form drawer to fill in the data
            setClickedCards((prevClicked) => ({ ...prevClicked, [cardKey]: true }));

            // Increase nodeCounter for new nodes
            setNodeCounter((prevCount) => prevCount + 1);
        }
    };

    const onNodeClick = (event, node) => {
        setSelectedNode(node); // Set the selected node when clicked
        setOpenActionDrawer(true); // Open action drawer when node is clicked
    };

    const onConnect = (params) => {
        console.log('onConnect called:', params); // Debugging line to check connection
        setEdges((eds) => addEdge(params, eds)); // Connect nodes with edges
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            label: `${selectedAction}\nName: ${formData.name}\n`,
        };

        // If no node is selected, update Node 1 (first selection)
        if (!isFirstNodeUsed) {
            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === '1' ? { ...node, data: updatedData } : node
                )
            );
            setIsFirstNodeUsed(true);
        } else {
            // If a node is selected, create a new node with the selected action and form data
            const newNode = {
                id: `${nodeCounter}`, // Use nodeCounter for unique node id
                type: 'default',
                position: { x: 250, y: 50 * nodeCounter }, // Adjust position based on nodeCounter
                data: updatedData,
            };
            setNodes((prevNodes) => [...prevNodes, newNode]);

            // Add edge to connect the new node to the last created node
            const newEdge = {
                id: `e${nodeCounter - 1}-${nodeCounter}`, // Generate a unique edge ID
                source: `${nodeCounter - 1}`, // Source node id
                target: `${nodeCounter}`, // Target node id
            };

            console.log('New edge:', newEdge); // Debugging line to check the edge properties

            setEdges((prevEdges) => [...prevEdges, newEdge]); // Add the new edge
        }

        setOpenFormDrawer(false); // Close the form drawer after submission
        setFormData({ name: '', description: '' }); // Reset form data
    };

    return (
        <div style={{ height: '500px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                onConnect={onConnect}
                fitView
            >
                <MiniMap />
                <Controls />
            </ReactFlow>

            {/* Drawer for selecting an action */}
            <Drawer anchor="right" open={openActionDrawer} onClose={() => setOpenActionDrawer(false)}>
                <Box sx={{ width: 350, padding: 2 }}>
                    <h3>Select an Action</h3>
                    {['Send an email webhook', 'Send a webhook notification'].map((action, index) => (
                        <Card
                            key={index}
                            sx={{
                                marginBottom: 2,
                                cursor: clickedCards[action] ? 'not-allowed' : 'pointer',
                                backgroundColor: clickedCards[action] ? '#e0e0e0' : '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                padding: '10px',
                            }}
                            onClick={() => !clickedCards[action] && addNode(action, action)}
                        >
                            <CardContent>
                                <Typography variant="h6">{action}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Drawer>

            {/* Form Drawer for filling form after selecting action */}
            <Drawer anchor="right" open={openFormDrawer} onClose={() => setOpenFormDrawer(false)}>
                <Box sx={{ width: 350, padding: 2 }}>
                    <h3>Configure {selectedAction}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            fullWidth
                            label="Node Name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Drawer>
        </div>
    );
};

export default FlowComponent;
