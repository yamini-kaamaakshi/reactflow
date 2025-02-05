
import {Form, Button, Select, Checkbox} from "antd";

const JobStatusForm = ({ initialValues, onSubmit, onFilterChange, jobTypes,tags,selectedTrigger }) => {

    const hasJobTypeFilter = selectedTrigger?.filters?.includes("JOB_TYPE");
    const masterDataTags = selectedTrigger?.filters?.includes("TAGS");

    const sortedTags = [...tags].sort((a, b) => a.key.localeCompare(b.key));
    return (
        <Form
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSubmit}
            style={{
                backgroundColor: "#f0f2f5",
                padding: "10px",
                borderRadius: "10px",
            }}
        >

            {hasJobTypeFilter &&  (
                <Form.Item label="Job Status" name="jobStatus">
                <Select
                    mode="multiple"
                    placeholder="Select Job Status"
                    onChange={(value) => onFilterChange(value, "jobStatus")}
                >
                    {jobTypes.map((job, index) => (
                        <Select.Option key={job.id || `fallback-${index}`} value={job.id}>
                            {job.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            )}
            {/* Tags Dropdown */}

            { masterDataTags && (
                <Form.Item label="Tags" name="tags">
                <Select
                    mode="multiple"
                    placeholder="Select Tags"
                    onChange={(value) => onFilterChange(value, "tags")}
                >
                    {sortedTags.map((tag) => (
                        <div key={tag.id} style={{marginBottom: "15px"}}>
                            <p style={{fontWeight: "bold", marginBottom: "5px"}}>{tag.key}</p>
                            <Checkbox.Group
                                onChange={(checkedValues) => onFilterChange(checkedValues, tag.key)}
                            >
                                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                                    {tag.values.map((value, index) => (
                                        <Checkbox key={`${tag.id}-${index}`} value={`${tag.key}-${value}`}>
                                            {value}
                                        </Checkbox>
                                    ))}
                                </div>
                            </Checkbox.Group>
                        </div>
                    ))}
                </Select>
            </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Apply Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default JobStatusForm;
