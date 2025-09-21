import React, { useState } from 'react'
import { Button, Drawer, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const menuItems = [
    {
        key: "home",
        label: <Link to="/">Home</Link>,
    },
    {
        key: "add-vehicle",
        label: <Link to="/add-vehicle">Add Vehicle</Link>,
    },
    {
        key: "search-and-book",
        label: <Link to="/search-and-book">Search & Book</Link>,
    },
    {
        key: "view-bookings",
        label: <Link to="/view-bookings">View Bookings</Link>,
    },
];


const HeaderComp = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <Header className='flex items-center justify-between'>
            <div className="demo-logo" >
                <p className='text-white font-bold text-lg'>
                    Fleet Link
                </p>
            </div>
            <div className="menu-container hidden md:flex grow-1">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={menuItems}
                    style={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    selectedKeys={[location.pathname.replace('/', '') || 'home']}
                />
            </div>
            <div className="md:hidden">
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ color: "#fff", fontSize: "20px" }} />}
                    onClick={() => setOpen(true)}
                    className="mobile-menu-btn"
                />
            </div>
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname.replace('/', '') || 'home']}
                    items={menuItems}
                    onClick={() => setOpen(false)} // close after navigation
                />
            </Drawer>
        </Header>
    )
}

export default HeaderComp