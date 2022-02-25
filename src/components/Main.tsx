import React from "react";
import { Routes } from "react-router";
import { Route } from "react-router-dom";
import Friends from "components/Friends/Friends";
import Profile from "components/Profile/Profile";
import Settings from "components/Settings/Settings";

const Main = () => {
  return (
    <Routes>
      <Route path="/user/:uid" element={<Profile />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Main;
