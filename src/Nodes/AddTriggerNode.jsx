import {create} from "zustand";
import {persist} from "zustand/middleware";
import {useState} from "react";
import {Button, Card, Drawer, Flex, Tooltip} from "antd";
import {IoIosFlash} from "react-icons/io";
import {PlusOutlined} from "@ant-design/icons";
import {MdDelete} from "react-icons/md";
import {Handle, Position} from "react-flow-renderer";
import JobStatusForm from "../Filters/TriggerFilters.jsx";
import { notification } from "antd";
import { FilterOutlined  } from "@ant-design/icons";
export const useFilterStore = create(
    persist(
        (set) => ({
            setIconColor: (color) => set({ iconColor: color }),
        }),
        {
            name: "applied-filters",
        }
    )
);
// eslint-disable-next-line react/prop-types
const AddTriggerNode = ({ data, onDelete, selectedTriggerName, jobTypes, tags, selectedTrigger, candidateStatus, source, jobStatus, isFilterDrawerVisible, setIsFilterDrawerVisible,users  }) => {
    const [isFilterEditDrawerVisible, setIsFilterEditDrawerVisible] = useState(false);
    const [formData, setFormData] = useState({ });
    const { setIconColor} = useFilterStore();
    const [isHovered, setIsHovered] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState(() => {
        const savedApplied = localStorage.getItem("appliedFilters");
        return savedApplied ? JSON.parse(savedApplied) : null;
    });

    const [tooltipOpen, setTooltipOpen] = useState(true);

    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;
    const hasFilters = parsedTrigger?.hasFilters === true;

    // Open Filter Drawer (Ensure it's opening on the first click)
    const handleFilterDrawerOpen = () => {


        if (appliedFilters) {
            setIsFilterEditDrawerVisible(true); // Open the edit drawer if filters are applied
        }
        else {
            setIsFilterDrawerVisible(true);
        }
    };

    // Close Filter Drawer
    const closeDrawer = () => {
        setIsFilterDrawerVisible(false); // Close the drawer
        setIsFilterEditDrawerVisible(false)
    };

    // Handle changes in the form's Select input
    const handleFilterChange = (value, field) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setSelectedTags(value);
    };



    const handleFilterSubmit = (values) => {
        setAppliedFilters(values);
        localStorage.setItem("appliedFilters", JSON.stringify(values));
        setFormData(values);
        setIconColor("green");
        closeDrawer();

        notification.success({
            message: "Filters Applied Successfully",
            description: "Your filters have been applied to the trigger.",
            duration: 2,
            placement: "bottomRight",
        });
    };

    const handleDelete = () => {
        setTooltipOpen(false); // Hide tooltip first

        // Add a slight delay before confirming deletion
        setTimeout(() => {
            if (window.confirm("Are you sure you want to delete this node?")) {
                localStorage.removeItem("appliedFilters");
                localStorage.removeItem("selectedTrigger");
                setAppliedFilters(null);
                setFormData(null);
                setIconColor("black");

                onDelete();
            }
        }, 100); // Small delay to ensure tooltip disappears
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
                    <span style={{fontSize: "12px", color: "rgb(11, 47, 115)" }}>
                        {selectedTriggerName || data.label}
                    </span>
                </Flex>

                {selectedTriggerName && isHovered && (
                    <div
                        style={{
                            top: "5px",
                            right: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            position: "absolute",
                        }}
                    >
                        {/* Show Filter Icon only if hasFilters is true */}
                        {hasFilters && (
                            <Tooltip title="Apply the filters">
                            <FilterOutlined
                                onClick={handleFilterDrawerOpen}
                                style={{
                                    fontSize: 16,
                                    color: "rgb(11, 47, 115)",
                                    cursor: "pointer",
                                }}
                            />
                                </Tooltip>
                        )}

                        {/* Delete Button should always appear when hovered */}
                        <Tooltip
                            title="Delete this trigger"
                            open={tooltipOpen}
                            onOpenChange={(isOpen) => setTooltipOpen(isOpen)} // Allows hover to show tooltip
                        >
                            <Button
                                onClick={handleDelete}
                                style={{
                                    backgroundColor: "white",
                                    border: "none",
                                    padding: 0,
                                    margin: 0,
                                }}
                                icon={<MdDelete style={{ color: "red", fontSize: "16px" }} />}
                            />
                        </Tooltip>
                    </div>
                )}
                <Handle type="source" position={Position.Bottom} />
            </Card>


            <Drawer
                title={appliedFilters ? "Edit Filter" : "Filter"}
                width={550}
                open={isFilterDrawerVisible || isFilterEditDrawerVisible}
                onClose={closeDrawer}
            >
                <JobStatusForm
                    initialValues={appliedFilters || formData}
                    onSubmit={handleFilterSubmit}
                    onFilterChange={handleFilterChange}
                    jobTypes={jobTypes}
                    tags={tags}
                    users={users}
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
