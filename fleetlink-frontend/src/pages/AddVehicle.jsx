import React from 'react'
import { Splitter } from 'antd'
import { Typography } from 'antd';

import BackButton from '../components/BackButton'
import AddVehicleForm from '../components/AddVehicleForm'

const { Title } = Typography;

const AddVehicle = () => {

    return (
        <div>
            <BackButton />
            <Splitter  style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Splitter.Panel defaultSize="40%" min="20%" max="70%">
                    <div className="p-4">
                        <Title level={2}>Add new vehicle</Title>
                        <AddVehicleForm />
                    </div>
                </Splitter.Panel>
                <Splitter.Panel>
                    <div className="p-4">
                        <Title level={2}>Vehicles</Title>
                    </div>
                </Splitter.Panel>
            </Splitter>
        </div>
    )
}

export default AddVehicle