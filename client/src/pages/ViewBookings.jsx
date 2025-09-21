import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import { deleteBooking, getBookings } from '../lib/apis'
import { Button, Card, Empty, Popconfirm, Typography } from 'antd'
import { showNotification } from '../utils/notifications';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const ViewBookings = () => {
    const [bookings, setBookings] = useState(null)

    useEffect(() => {
        loadBookings()
    }, [])

    const loadBookings = async () => {
        try {
            let data = await getBookings();
            setBookings(data.bookings);
        } catch (err) {
            console.error("Error while fetching vehicles: ", err)
        }
    }

    const confirm = async (bookingId) => {
        try {
            await deleteBooking(bookingId);
            showNotification("success", "Booking Deleted", "The booking has been deleted successfully.");
            loadBookings();
        } catch (err) {
            console.error("Error while deleting booking: ", err)
            showNotification("error", "Delete Failed", err.message || "There was an error deleting the booking.");
        }
    };
    return (
        <div>
            <BackButton />
            <Title level={2}>Bookings</Title>
            <div className='max-h-[60vh] overflow-y-auto'>
                {bookings && bookings.length === 0 && <Empty
                    description={
                        <Text>
                            No bookings made yet. <br />
                        </Text>
                    }
                >
                    <Link to="/search-and-book">
                        <Button type="primary">Book Now</Button>
                    </Link>
                </Empty>}
                {bookings && bookings.map(booking => {
                    return (
                        <Card size="small" key={booking._id} style={{ marginBottom: '10px', }} title={`Booking ID: ${booking._id.slice(0, 6)}`} variant="borderless">
                            <div className='mb-2 flex gap-3'>
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
                                <div className='justify-end flex grow-1'>
                                    <Popconfirm
                                        title="Delete the Booking"
                                        description="Are you sure to delete this Booking?"
                                        onConfirm={() => confirm(booking._id)}
                                        okText="Yes"
                                        cancelText="No"
                                        placement="topRight"
                                    >
                                        <Button danger>Delete</Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </Card>
                    )
                })}</div>
        </div>
    )
}

export default ViewBookings