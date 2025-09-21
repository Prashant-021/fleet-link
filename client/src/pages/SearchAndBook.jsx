import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import { Button, DatePicker, Empty, Form, Input, InputNumber, Splitter, Typography } from 'antd'

import dayjs from 'dayjs';
import { createBooking, searchAvailableVehicles } from '../lib/apis';
import VehicleList from '../components/VehicleList';
import { showNotification } from '../utils/notifications';
import { CarOutlined } from '@ant-design/icons';

const { Title } = Typography;
const SearchAndBook = () => {
    const [availableVehiclesData, setAvailableVehiclesData] = useState({ availableVehicles: null, estimatedRideDurationHours: -1 });
    const [form] = Form.useForm();

    const fetchAvailableVehicles = async (values) => {
        try {
            const params = new URLSearchParams({
                capacityRequired: String(values.capacityRequired || ''),
                fromPincode: values.fromPincode || '',
                toPincode: values.toPincode || '',
                startTime: new Date(values.startDateTime).toISOString()
            })
            let data = await searchAvailableVehicles(params);
            setAvailableVehiclesData(data)
        } catch (err) {
            console.error("Error while adding Vehicle: ", err)
            showNotification('error', 'Failed to find vehicle', 'Unable to find vehicle. Please try again later.')
        }
    }
    const onFinish = async (values) => {
        fetchAvailableVehicles(values);
    };
    const onFinishFailed = errorInfo => {
        showNotification('error', 'Failed to find vehicle', errorInfo || 'Unable to find vehicle. Please try again later.')

    };

    const handleBook = async (vehicle) => {
        const formValues = form.getFieldsValue();
        try {
            let bookingDetails = {
                vehicleId: vehicle._id,
                fromPincode: formValues.fromPincode,
                toPincode: formValues.toPincode,
                customerId: "Demo User",
                startTime: formValues.startDateTime,

            }
            await createBooking(bookingDetails)
            showNotification('success', 'Vehicle Booked')
            fetchAvailableVehicles(formValues);
        } catch (err) {
            showNotification('error', 'Booking Failed', err.message || 'Unable to book vehicle. Please try again later.')
        }
    }
    return (
        <div className=''>
            <BackButton />
            <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Splitter.Panel defaultSize="40%" min="20%" max="70%">
                    <div className="p-4">
                        <Title level={2}>Search vehicle</Title>
                        <Form
                            form={form}
                            name="Search Vehicle"
                            title='Search Vehicle'
                            initialValues={{ capacityRequired: 0, fromPincode: 0, toPincode: 0, startDateTime: dayjs() }}
                            onFinish={onFinish}
                            layout='vertical'
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Capacity Required Kg)"
                                name="capacityRequired"
                                rules={[{ required: true, type: 'number', min: 0, max: 99999 }]}
                            >
                                <InputNumber className='w-full' />
                            </Form.Item>
                            <Form.Item
                                label="From Pincode"
                                name="fromPincode"
                                rules={[{ required: true, type: 'number', min: 0, max: 999999 }]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label="To Pincode"
                                name="toPincode"
                                rules={[{ required: true, type: 'number', min: 0, max: 999999 }]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                label="Start Date & Time"
                                name="startDateTime"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    disabledDate={(current) => {
                                        return current && current < dayjs().startOf("day");
                                    }}
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Search Vehicle
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Splitter.Panel>
                <Splitter.Panel>
                    <div className="p-4">
                        <Title level={2}>Listed Vehicles</Title>
                        {availableVehiclesData.estimatedRideDurationHours >= 0 && <p className='mb-2'><strong>Estimated Ride Duration: </strong>{availableVehiclesData.estimatedRideDurationHours} hrs</p>}
                        {!availableVehiclesData.availableVehicles && "Fill the form to see available vehicles"}
                        <VehicleList vehicles={availableVehiclesData.availableVehicles} isBookable={true} onBook={(vehicle) => handleBook(vehicle)} />
                    </div>
                </Splitter.Panel>
            </Splitter>
        </div>
    )
}

export default SearchAndBook

