import React from 'react'
import { Button, Card, Popconfirm } from 'antd'
import { deleteVehicle } from '../lib/apis';

const VehicleList = ({ vehicles, reloadVehicles, isEdit = false ,isBookable = false, onBook}) => {
  const confirm = async (vehicleId) => {
    console.log("Delete vehicle with id: ", vehicleId);
    try {
      await deleteVehicle(vehicleId);
      reloadVehicles();
    } catch (err) {
      console.error("Error while deleting vehicle: ", err)
    }
  };
  const cancel = e => {
    console.log(e);
  };
  return (
    <div className='max-h-[60vh] overflow-y-auto'>{vehicles && vehicles.map(vehicle => {
      return (
        <Card size="small" key={vehicle._id} style={{ marginBottom: '10px', }} title={vehicle.name} variant="borderless">
          <div className='mb-2 flex justify-between items-center'>
            <div>
              <p><strong>Capacity (Kg): </strong>{vehicle.capacityKg}</p>
              <p><strong>Tyres: </strong>{vehicle.tyres}</p>
            </div>
            {isEdit &&
              <Popconfirm
                title="Delete the Vehicle"
                description="Are you sure to delete this Vehicle?"
                onConfirm={() => confirm(vehicle._id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            }
            {isBookable && <Button type="primary" onClick={() => onBook(vehicle)}>Book</Button>}
          </div>
        </Card>
      )
    })}</div>
  )
}

export default VehicleList