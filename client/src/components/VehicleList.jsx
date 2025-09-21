import React from 'react'
import { Button, Card, Empty, Popconfirm } from 'antd'
import { deleteVehicle } from '../lib/apis';
import { showNotification } from '../utils/notifications';

const VehicleList = ({ vehicles, reloadVehicles, isEdit = false, isBookable = false, onBook }) => {
  const confirm = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      showNotification("success", "Vehicle Deleted", "The vehicle has been deleted successfully.");
      reloadVehicles();
    } catch (err) {
      console.error("Error while deleting vehicle: ", err)
      showNotification("error", "Delete Failed", err.message || "There was an error deleting the vehicle.");
    }
  };
  return (
    <div className='max-h-[60vh] overflow-y-auto'>
      {
        vehicles && vehicles.length === 0 && <Empty description="No vehicles found" />
      }
      {
        vehicles &&  vehicles.map(vehicle => {
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
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                }
                {isBookable && <Button type="primary" disabled={vehicle.isBooked} onClick={() => onBook(vehicle)}>{vehicle.isBooked ? "Booked" : "Book"}</Button>}
              </div>
            </Card>
          )
        })}</div>
  )
}

export default VehicleList