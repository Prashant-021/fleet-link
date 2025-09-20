import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

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

    return (
        <Header className='flex items-center justify-between'>
            <div className="demo-logo" >
                <p className='text-white font-bold text-lg'>
                    Fleet Link
                </p>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                items={menuItems}
                style={{ flexGrow: 1, justifyContent: 'flex-end' }}
                selectedKeys={[location.pathname.replace('/','') || 'home']} 
            />
        </Header>
    )
}

export default HeaderComp