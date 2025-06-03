import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./components/Orders/OrdersPage";
import { ThemeProvider } from "./context/ThemeContext";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); 
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;