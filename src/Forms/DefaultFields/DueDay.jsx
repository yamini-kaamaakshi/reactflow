import {Form, Select} from "antd";


const DueDay = ({ formData }) => {

    return (
        <Form.Item label="Due Date:" name="dueDate"  rules={[{ required: true}]}
                   initialValue={formData?.dueDate}>
            <Select
                className="form-control"

            >
                <Select.Option value="0">Same Day</Select.Option>
                <Select.Option value="1">After 1 Day</Select.Option>
                <Select.Option value="2">After 2 Days</Select.Option>
                <Select.Option value="3">After 3 Days</Select.Option>
                <Select.Option value="4">After 4 Days</Select.Option>
                <Select.Option value="5">After 5 Days</Select.Option>
                <Select.Option value="7">After 1 Week</Select.Option>
                <Select.Option value="14">After 2 Weeks</Select.Option>
                <Select.Option value="30">After 1 Month</Select.Option>
            </Select>
        </Form.Item>
    );
};

export default DueDay