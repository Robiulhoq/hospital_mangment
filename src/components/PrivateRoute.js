import { Navigate } from "react-router-dom";

export function AdminRoute({ user, children }) {
  if (user == "admin") {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export function DoctorRoute({ user, children }) {
  if (user == "admin" || user == "doctor") {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export function AccountedRoute({ user, children }) {
  if (user == "admin" || user == "accounted") {
    return children;
  }
  return <Navigate to="/login" replace />;
}

export function NurseRoute({ user, children }) {
  if (user == "admin" || user == "nurse") {
    return children;
  }
  return <Navigate to="/login" replace />;
}
