import React from 'react'
import { Route, Routes } from "react-router-dom";

// admin
import Login from "../components/Admin/pages/Login";
import Layout from "../components/Admin/pages/Layout";
import PrivateRoute from "../components/Admin/auth/PrivateRoute";
import DashBoard from "../components/Admin/pages/Dashboard";
import AddNews from "../components/Admin/pages/AddNews";
import OpenRoute from "../components/Admin/auth/OpenRoute";
import AllNews from "../components/Admin/pages/AllNews";
import Category from "../components/Admin/pages/Category";
import Subcategory from "../components/Admin/pages/Subcategory";
import Livestreming from "../components/Admin/pages/Livestreming";
import Breaking from "../components/Admin/pages/Breaking";
import Poll from "../components/Admin/pages/Poll";
import CreateAdd from "../components/Admin/pages/CreateAdd";
import AdminManage from "../components/Admin/pages/ManageAdmin";
import CreateYtVideo from "../components/Admin/pages/CreateYtVideo";
import UsersTable from "../components/Admin/pages/AllUser";
import { useSelector } from 'react-redux';

function AdminRoutes() {
  const { user } = useSelector((state) => state.auth);

  return (
<Routes>

    <Route
    element={
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    }
  > 
{(user?.role === "Admin" || user?.role === "SuperAdmin") && (
      <>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addnews" element={<AddNews />} />
        <Route path="/addnews/:id" element={<AddNews />} />
        <Route path="/allnews" element={<AllNews />} />

        <Route path="/poll" element={<Poll />} />
        <Route path="/breaking" element={<Breaking />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/livestriming" element={<Livestreming />} />
        <Route path="/ads" element={<CreateAdd />} />
        <Route path="/yt" element={<CreateYtVideo />} />
        <Route path="/users" element={<UsersTable />} />

        {user?.role === "SuperAdmin" && (
          <Route path="/manageadmin" element={<AdminManage />} />
        )}
      </>
    )}
    </Route>
</Routes>

  )
}

export default AdminRoutes