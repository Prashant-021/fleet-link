import React, { useEffect } from 'react';
import { Layout, notification } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const { Content } = Layout;


import Home from "./pages/Home";
import AddVehicle from './pages/AddVehicle';
import SearchAndBook from './pages/SearchAndBook';
import ViewBookings from './pages/ViewBookings';
import HeaderComp from './components/HeaderComp'
import { initNotification } from './utils/notifications';


const App = () => {

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    initNotification(api);
  }, [api]);
  return (
    <>
      {contextHolder}
      <Router>
        <Layout>
          <HeaderComp />
          <Content className='px-5 md:px-7'>
            <div
              style={{
                minHeight: "85vh",
                padding: 24,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-vehicle" element={<AddVehicle />} />
                <Route path="/search-and-book" element={<SearchAndBook />} />
                <Route path="/view-bookings" element={<ViewBookings />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Router>
    </>
  );
};
export default App;