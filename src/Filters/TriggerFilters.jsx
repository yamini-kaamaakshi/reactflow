import { Form, Button, Select, Checkbox } from "antd";

const JobStatusForm = ({ initialValues, onSubmit, onFilterChange, jobTypes, tags, selectedTags,candidateStatus,source }) => {
    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;

    const hasJobTypeFilter = parsedTrigger?.filters?.includes("JOB_TYPE");
    const masterDataTags = parsedTrigger?.filters?.includes("TAGS");
    const candidateStatusData = parsedTrigger?.filters?.includes('CANDIDATE_STATUS');
    const  sourceData = parsedTrigger?.filters?.includes( "SOURCE");
    console.log("source",source)

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

            {hasJobTypeFilter  && (
                <Form.Item label="Job Type" name="jobType">
                    <Select
                        mode="multiple"
                        placeholder="Select Job Type"
                        onChange={(value) => onFilterChange(value, "jobType")}
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

            { candidateStatusData && (
                <Form.Item label="Candidate Status" name="candidateStatus">
                <Select
                    mode="multiple"
                    placeholder="Select Candidate Status"
                    onChange={(value) => onFilterChange(value, "candidateStatus ")}
                    style={{width: "100%"}}
                    showSearch
                >
                    {candidateStatus.map((candidateStatus) => (
                        <Select.Option key={candidateStatus.id} value={candidateStatus.name}>
                            {candidateStatus.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            )}
            { sourceData && (
                <Form.Item label="Source" name="source">
                    <Select
                        mode="multiple"
                        placeholder="Select Source"
                        onChange={(value) => onFilterChange(value, "source ")}
                        style={{width: "100%"}}
                        showSearch
                    >
                        {source.map((source) => (
                            <Select.Option key={source.id} value={source.name}>
                                {source.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>)}
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
