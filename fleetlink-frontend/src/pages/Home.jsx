import { Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const CardItems = [
    {
        title: "Add Vehicle",
        content: "This is the content of Card 1",
        link: "/add-vehicle",
    },
    {
        title: "Search And Book",
        content: "This is the content of Card 2",
        link: "/search-and-book",
    },
    {
        title: "View Bookings",
        content: "This is the content of Card 3",
        link: "/view-bookings",
    },
];

const Home = () => {
    return (
        <Row  gutter={[16, 16]}>
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