import React, { useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, addEdge } from 'react-flow-renderer';
import { Drawer, Card, CardContent, Box, Typography, TextField, Button } from '@mui/material';

const FlowComponent = () => {
    // Initialize the state with data from localStorage or fallback to default values
    const [nodes, setNodes] = useState(() => {
        const savedNodes = localStorage.getItem('nodes');
        return savedNodes ? JSON.parse(savedNodes) : [
            { id: '1', type: 'default', position: { x: 250, y: 100 }, data: { label: 'Node 1' } }
        ];
    });

    const [edges, setEdges] = useState(() => {
        const savedEdges = localStorage.getItem('edges');
        return savedEdges ? JSON.parse(savedEdges) : [];
    });

    const [openActionDrawer, setOpenActionDrawer] = useState(false);
    const [openFormDrawer, setOpenFormDrawer] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedNode, setSelectedNode] = useState();
    const [formData, setFormData] = useState([]);
    const [clickedCards, setClickedCards] = useState({ card1: false, card2: false });
    const [nodeCounter, setNodeCounter] = useState(() => {
        const savedNodeCounter = localStorage.getItem('nodeCounter');
        return savedNodeCounter ? Number(savedNodeCounter) : 2;
    });
    const [isFirstNodeUsed, setIsFirstNodeUsed] = useState(false);

    useEffect(() => {
        // Save data to localStorage whenever nodes, edges, selectedAction, formData or nodeCounter change
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));


    }, [nodes, edges]);

    const addNode = (cardLabel, cardKey) => {
        setSelectedAction(cardLabel); // Set the selected action
        setOpenActionDrawer(false); // Close the action drawer after selecting action
        setOpenFormDrawer(true); // Open the form drawer to fill in the data

        // Increase nodeCounter for new nodes
        setNodeCounter((prevCount) => prevCount + 1);
    };

    const onNodeClick = (event, node) => {
        setSelectedNode(node); // Set the selected node when clicked
        setOpenActionDrawer(true); // Open action drawer when node is clicked
    };

    const onConnect = (params) => {
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

        const gap = 100; // Fixed gap between nodes on the y-axis

        if (!isFirstNodeUsed) {
            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === '1' ? { ...node, data: updatedData } : node
                )
            );
            setIsFirstNodeUsed(true);
        } else {
            const newNode = {
                id: `${nodeCounter - 2}`,
                type: 'default',
                position: { x: 250, y: gap * (nodeCounter - 2) },
                data: updatedData,
            };
            setNodes((prevNodes) => [...prevNodes, newNode]);

            const newEdge = {
                id: `e${nodeCounter - 3}-${nodeCounter - 2}`,
                source: `${nodeCounter - 3}`,
                target: `${nodeCounter - 2}`,
            };

            setEdges((prevEdges) => [...prevEdges, newEdge]);
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
                            onClick={() => addNode(action, action)}
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
