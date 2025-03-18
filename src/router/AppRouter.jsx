import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../Auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components";

import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const status = useCheckAuth();
  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />

      {/* login y registro
      <Route path="/auth/*" element={<AuthRoutes />} />

      Journal App
      <Route path="/*" element={<JournalRoutes />} /> */}

      <Route />
    </Routes>
  );
};
