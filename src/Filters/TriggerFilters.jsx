import { Form, Button, Select } from "antd";

const JobStatusForm = ({ initialValues, onSubmit, onFilterChange, jobTypes }) => {
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Apply Filter
                </Button>
            </Form.Item>
        </Form>
    );
};

export default JobStatusForm;
