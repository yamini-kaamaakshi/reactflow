import {create} from "zustand";
import {persist} from "zustand/middleware";
import {useEffect, useState} from "react";
import {Button, Card, Drawer, Flex} from "antd";
import {IoIosFlash} from "react-icons/io";
import {PlusOutlined} from "@ant-design/icons";
import {MdDelete} from "react-icons/md";
import {Handle, Position} from "react-flow-renderer";
import JobStatusForm from "../Filters/TriggerFilters.jsx";

export const useFilterStore = create(
    persist(
        (set) => ({
            // isFilterDrawerVisible: false,  // Add filterDrawerVisible state
            // setIsFilterDrawerVisible: (isVisible) => set({ isFilterDrawerVisible: isVisible }), // Method to update filterDrawerVisible
            setIconColor: (color) => set({ iconColor: color }),
        }),
        {
            name: "applied-filters",
        }
    )
);
// eslint-disable-next-line react/prop-types
const AddTriggerNode = ({ data, onDelete, selectedTriggerName, jobTypes, tags, selectedTrigger, candidateStatus, source, jobStatus, isFilterDrawerVisible, setIsFilterDrawerVisible  }) => {
    const [formData, setFormData] = useState({ jobStatus: [] });
    const { setIconColor} = useFilterStore();
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState(() => {
        const savedApplied = localStorage.getItem("appliedFilters");
        return savedApplied ? JSON.parse(savedApplied) : null;
    });

    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;
    const hasFilters = parsedTrigger?.hasFilters === true;

    // Persist appliedFilters in localStorage whenever it changes
    useEffect(() => {
        if (appliedFilters) {
            localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
        }
    }, [appliedFilters]);

    // Open Filter Drawer (Ensure it's opening on the first click)
    const handleFilterDrawerOpen = () => {
        setIsFilterDrawerVisible(true); // Open the drawer when the button is clicked
    };

    // Close Filter Drawer
    const closeDrawer = () => {
        setIsFilterDrawerVisible(false); // Close the drawer
    };

    // Handle changes in the form's Select input
    const handleFilterChange = (value, field) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setSelectedTags(value);
    };

    const handleFilterSubmit = (values) => {
        setAppliedFilters(values);
        setFormData(values);
        setIconColor("green");
        closeDrawer();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this node?")) {
            localStorage.removeItem("appliedFilters");
            localStorage.removeItem("selectedTrigger");
            setAppliedFilters(null);
            setFormData(null);
            setIconColor("black");
            onDelete();
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

            <Card
                style={{ width: 350, padding: 0 }}
                hoverable
                size="small"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Flex align="center" justify="center" gap="middle">
                    {!selectedTriggerName && <PlusOutlined />}
                    <span style={{ color: "rgb(11, 47, 115)" }}>
                        {selectedTriggerName || data.label}
                    </span>
                </Flex>

                {selectedTriggerName && !appliedFilters && hasFilters && (
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
                                    <span style={{ fontWeight: "bold" }}> Tags:</span>{" "}
                                    {appliedFilters.tags.map((tag) => tag).join(", ")}
                                </>
                            )}
                        </p>
                    </div>
                )}

                <Handle type="source" position={Position.Bottom} />
            </Card>

            {/* Drawer for Filters */}
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
                    candidateStatus={candidateStatus}
                    source={source}
                    jobStatus={jobStatus}
                    selectedTags={selectedTags}
                    selectedTrigger={selectedTrigger}
                />
            </Drawer>
        </>
    );
};

export default AddTriggerNode;
