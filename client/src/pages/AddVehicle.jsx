import { useState, useEffect } from 'react';

import { Button, Form, Input, InputNumber, Splitter } from 'antd'
import { Typography } from 'antd';

import BackButton from '../components/BackButton'
import VehicleList from '../components/VehicleList';
import { addVehicleAPI, getVehicles } from '../lib/apis';
import { showNotification } from '../utils/notifications';

const { Title } = Typography;

const AddVehicle = () => {

    const [vehicles, setVehicles] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            let data = await getVehicles();
            setVehicles(data.vehicles);
        } catch (err) {
            console.error("Error while fetching vehicles: ", err)
        }
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            let vehicle = {
                "name": values.Name,
                "capacityKg": values.capacityKg,
                "tyres": values.tyres
            }
            await addVehicleAPI(vehicle).then(() => loadVehicles());
            showNotification("success", "Vehicle Added", `${vehicle.name} has been added successfully!`);
        } catch (err) {
            console.error("Error while adding Vehicle: ", err)
            showNotification("error", "Add Failed", "There was an error adding the vehicle.");

        }
        form.resetFields();
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        showNotification("warning", "Form Error", "Please fill in all required fields.");

    };
    return (
        <div>
            <BackButton />
            <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Splitter.Panel defaultSize="40%" min="20%" max="70%">
                    <div className="p-4">
                        <Title level={2}>Add new vehicle</Title>
                        <Form
                            form={form}
                            name="Add Vehicle"
                            title='Add Vehicle'
                            initialValues={{ name: '', capacityKg: 0, tyres: 0 }}
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
                    </div>
                </Splitter.Panel>
                <Splitter.Panel>
                    <div className="p-4">
                        <Title level={2}>Listed Vehicles</Title>
                        {vehicles && <VehicleList vehicles={vehicles} isEdit={true} reloadVehicles={loadVehicles} />}
                    </div>
                </Splitter.Panel>
            </Splitter>
        </div>
    )
}

export default AddVehicle