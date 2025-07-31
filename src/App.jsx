import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom"
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import SigninForm from "./components/signInForm";
import AuthProvider from "./contexts/AuthProvider";
import "./App.css"
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Subscription from "./components/Subscription";
import Order from "./components/Order";
import Message from "./components/Message";
import NewTicket from "./components/NewTicket";
import AdminLoginForm from "./components/AdminLoginPage";
import Admin from "./components/Admin";
import AdminMessage from "./components/AdminMessage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Billing from "./components/Billing";
import Home from "./components/Home";
import Unauthorized from "./components/Unauthorized";
const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    '/dashboard',
    '/subscription',
    '/order',
    '/message',
    '/message/new-ticket',
    '/admin',
    '/admin-message/:userId',
    '/billing',
    '/',
    '/new-ticket'
  ];
  const hideFooterRoutes = [
    '/'
  ];

  const shouldHideFooter = hideFooterRoutes.some((route) => {
    if (route.includes(':')) {
      // Convert "/admin-message/:userId" to a regex like /^\/admin-message\/[^\/]+$/
      const pattern = new RegExp('^' + route.replace(/:[^/]+/g, '[^/]+') + '$');
      return pattern.test(location.pathname);
    }
    return route === location.pathname;
  });

  const shouldHideHeader = hideHeaderRoutes.some((route) => {
    if (route.includes(':')) {
      // Convert "/admin-message/:userId" to a regex like /^\/admin-message\/[^\/]+$/
      const pattern = new RegExp('^' + route.replace(/:[^/]+/g, '[^/]+') + '$');
      return pattern.test(location.pathname);
    }
    return route === location.pathname;
  });
    return (
      <>
        {!shouldHideHeader && <Navbar />}

        <AuthProvider>
          <Routes>
            <Route path="/signIn"  element={<SigninForm />}/>
            <Route path="/"  element={<Home />}/>
            <Route path="/admin-login" element={<AdminLoginForm />} />
            <Route path="/unauthorized" element={<Unauthorized/>} />

            <Route element={<ProtectedRoutes requiredRole="seller" />}>

              <Route path="/message" element={<Message />} />
              <Route path="/new-ticket" element={<NewTicket />} />

              <Route path="/subscription" element={<Subscription />} />
              <Route path="/order" element={<Order />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/dashboard"  element={<Dashboard />}/>

              <Route />
            </Route>

            <Route element={<ProtectedRoutes requiredRole="admin" />}>
              
              <Route path="/admin-message/:userId" element={<AdminMessage />} />
              <Route path="/admin" element={<Admin />} />

            </Route>


            <Route path="*" element={<h1 style={{marginTop: "100px", textAlign: "center"}}>Page not found</h1>} />
          </Routes>

          <Toaster
          position="top-right"
          richColors
          closeButton
          visibleToasts={1}
          />
          {!shouldHideFooter && <Footer />}
          {/* <Footer /> */}
        </AuthProvider>

        
      </>
    );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
