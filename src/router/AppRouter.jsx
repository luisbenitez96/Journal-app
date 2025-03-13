import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../Auth/routes/AuthRoutes";
import { JournalPage } from "../journal/pages/JournalPage";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* login y registro */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Journal App */}
      <Route path="/*" element={<JournalRoutes />} />

      <Route />
    </Routes>
  );
};
