import { Form, Button, Select, Checkbox } from "antd";

// eslint-disable-next-line react/prop-types
const JobStatusForm = ({ initialValues, onSubmit, onFilterChange, jobTypes, tags, selectedTags,candidateStatus,source,jobStatus,users }) => {
    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;

    const JobType = parsedTrigger?.filters?.includes("JOB_TYPE");
    const masterDataTags = parsedTrigger?.filters?.includes("TAGS");
    const candidateStatusData = parsedTrigger?.filters?.includes('CANDIDATE_STATUS');
    const  sourceData = parsedTrigger?.filters?.includes( "SOURCE");
    const  jobStatusData = parsedTrigger?.filters?.includes( "JOB_STATUS");
    const  owner = parsedTrigger?.filters?.includes( "OWNER");

    const sortedTags = [...tags].sort((a, b) => a.key.localeCompare(b.key));
    return (
<>
    <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
        Select the filters below to target a specific group of records with this automation
    </div>
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
            {JobType  && (
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
            { jobStatusData && (
                <Form.Item label="Job Status" name="jobStatus">
                    <Select
                        mode="multiple"
                        placeholder="Select Job Status"
                        onChange={(value) => onFilterChange(value, "jobStatus")}
                        style={{width: "100%"}}
                        showSearch
                    >
                        {jobStatus.map((job) => (
                            <Select.Option key={job.id} value={job.name}>
                                {job.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )}

            { owner && (
                <Form.Item label="Owner" name="owner">
                    <Select
                        mode="multiple"
                        placeholder="Select Owner"
                        onChange={(value) => onFilterChange(value, "owner")}
                        style={{ width: "100%" }}
                        showSearch
                    >
                        {users
                            .sort((a, b) => a.fullName.localeCompare(b.fullName)) // Sort alphabetically
                            .map((owner) => (
                                <Select.Option key={owner.id} value={owner.fullName}>
                                    {owner.fullName}
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
                            <Select.OptGroup key={index} label={<span style={{ fontSize: 15, fontWeight: "bold" }}>{tagGroup.key}</span>} >
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

            {/* Submit Button */}

        </Form>
</>
    );
};

export default JobStatusForm;
