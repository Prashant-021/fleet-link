import { Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const CardItems = [
    {
        title: "Add Vehicle",
        content: "Register a new vehicle in the system by providing details like name, capacity, and tyres.",
        link: "/add-vehicle",
    },
    {
        title: "Search And Book",
        content: "Find available vehicles based on your location and schedule, and book them instantly for your travel needs.",
        link: "/search-and-book",
    },
    {
        title: "View Bookings",
        content: "See all your current and past bookings with details such as dates, routes, and assigned vehicles.",
        link: "/view-bookings",
    },
];


const Home = () => {
    return (
        <Row gutter={[16, 16]}>
            {CardItems.map((item, index) => (
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    key={index}>
                    <Link to={item.link}>
                        <Card
                            title={item.title}
                            hoverable
                            style={{ height: "100%" }} // makes whole card clickable
                            variant="borderless"
                        >
                            {item.content}
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default Home