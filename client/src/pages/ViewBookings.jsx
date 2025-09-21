import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import { getBookings } from '../lib/apis'
import { Card, Typography } from 'antd'

const { Title } = Typography;

const ViewBookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        loadBookings()
    }, [])

    const loadBookings = async () => {
        try {
            let data = await getBookings();
            console.log(data.bookings);

            setBookings(data.bookings);
        } catch (err) {
            console.error("Error while fetching vehicles: ", err)
        }
    }
    return (
        <div>
            <BackButton />
            <Title level={2}>Bookings</Title>
            <div className='max-h-[60vh] overflow-y-auto'>{bookings && bookings.map(booking => {
                return (
                    <Card size="small" key={booking._id} style={{ marginBottom: '10px', }} title={`Booking ID: ${booking._id.slice(0, 6)}`} variant="borderless">
                        <div className='mb-2 flex gap-3'>
                            {/* <div className='flex gap-2'> */}
                            <Card title={"Duration"}>
                                <p>
                                    <strong>Start Date and Time: </strong>
                                    {new Date(booking.startTime).toLocaleString()}
                                </p>
                                <p>
                                    <strong>End Date and Time: </strong>
                                    {new Date(booking.endTime).toLocaleString()}
                                </p>
                            </Card>
                            <Card title={"Location"}>
                                <p><strong>From Pincode: </strong>{booking.fromPincode}</p>
                                <p><strong>To Pincode: </strong>{booking.toPincode}</p>
                            </Card>
                            <Card title={"Assigned Vehicle"}>
                                <p><strong>Name: </strong>{booking.vehicleId?.name}</p>
                                <p><strong>Capacity (Kg): </strong>{booking.vehicleId?.capacityKg}</p>
                                <p><strong>Tyres: </strong>{booking.vehicleId?.tyres}</p>
                            </Card>
                            {/* </div> */}

                        </div>
                    </Card>
                )
            })}</div>
        </div>
    )
}

export default ViewBookings