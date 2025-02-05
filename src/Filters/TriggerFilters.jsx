
import {Form, Button, Select, Checkbox} from "antd";

const JobStatusForm = ({ initialValues, onSubmit, onFilterChange, jobTypes,tags,selectedTrigger,selectedTags }) => {

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
            <Form.Item label="Tags" name="tags">
                <Select
                    mode="multiple"
                    placeholder="Search Tags"
                    onChange={onFilterChange}
                    style={{ width: "100%" }}
                    showSearch
                    value={selectedTags} // Bind selectedTags to the Select component
                    optionLabelProp="label"  // Ensure the label is used for display
                >
                    {tags.map((tagGroup, index) => (
                        <Select.OptGroup key={index} label={tagGroup.key}>
                            {tagGroup.values.map((value, subIndex) => (
                                <Select.Option key={`${tagGroup.key}-${subIndex}`} value={value} label={value}>
                                    <Checkbox checked={selectedTags.includes(value)}>{value}</Checkbox>
                                </Select.Option>
                            ))}
                        </Select.OptGroup>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Apply Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default JobStatusForm;
