import { Form, Button, Select, Checkbox } from "antd";

const JobStatusForm = ({ initialValues, onSubmit, onFilterChange, jobTypes, tags, selectedTrigger, selectedTags }) => {

    const hasJobTypeFilter = selectedTrigger?.filters?.includes("JOB_TYPE");
    const masterDataTags = selectedTrigger?.filters?.includes("TAGS");

    // Sort tags for consistent display
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

            {hasJobTypeFilter && (
                <Form.Item label="Job Type" name="jobType">
                    <Select
                        mode="multiple"
                        placeholder="Select Job Type"
                        onChange={(value) => onFilterChange(value, "jobType")} // Ensure filter change updates correctly
                        style={{ width: "100%" }}
                        showSearch
                    >
                        {jobTypes.map((job) => (
                            <Select.Option key={job.id} value={job.name}>
                                {job.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )}

            {/* Tags Dropdown */}
            {masterDataTags && (
                <Form.Item label="Tags" name="tags">
                    <Select
                        mode="multiple"
                        placeholder="Search Tags"
                        onChange={(value) => onFilterChange(value, "tags")} // ensure onFilterChange handles tag updates
                        style={{ width: "100%" }}
                        showSearch
                        value={selectedTags} // Bind selectedTags to the Select component
                        optionLabelProp="label" // Ensure the label is used for display
                    >
                        {sortedTags.map((tagGroup, index) => (
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
            )}

            {/* Submit Button */}
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Apply Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default JobStatusForm;
