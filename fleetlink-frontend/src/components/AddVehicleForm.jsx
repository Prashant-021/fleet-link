import { Button, Form, Input, InputNumber } from 'antd'
import React from 'react'
import { addVehicleAPI } from '../lib/apis';

const AddVehicleForm = () => {

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            let vehicle = {
                "name": values.Name,
                "capacityKg": values.capacityKg,
                "tyres": values.tyres
            }
            await addVehicleAPI(vehicle);
        } catch (err) {
            console.error("Error while adding Vehicle: ", err)
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="Add Vehicle"
            title='Add Vehicle'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout='vertical'
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="Name"
                rules={[{ required: true, message: 'Name is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Capacity(Kg)"
                name="capacityKg"
                rules={[{ required: true, type: 'number', min: 0, max: 999 }]}
            >
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
                label="Tyres"
                name="tyres"
                rules={[{ required: true, type: 'number', min: 0, max: 999 }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Add Vehicle
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddVehicleForm