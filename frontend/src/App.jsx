import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useLocation, Outlet } from 'react-router-dom';
import { AppProvider } from "context/AppContext"
import Loader from 'common/Loader';
import DefaultLayout from 'layout/DefaultLayout';
import BusinessContext from "Pages/BusinessContext"
import LinkedAIValue from 'Pages/LinkedAIValue';
import AITechEnablement from 'Pages/AITechEnablement';
import AIResponsibleUse from 'Pages/AIResponsibleUse';
import AIStrategy from 'Pages/AIStrategy'
import LogIn from 'Pages/LogIn';
import SignUp from 'Pages/SignUp';
import Opportunities from 'Pages/Opportunities';
import FinalResult from 'Pages/FinalResult';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function Wrapper () {
  return (
    <DefaultLayout>
          <Outlet/>
    </DefaultLayout>
  )
}

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AppProvider>
        <Routes>
            <Route index element={<LogIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route element={<Wrapper/>}>
                <Route path="business-context" element={<BusinessContext />} />
                <Route path="value-areas" element={<LinkedAIValue />} />
                <Route path="opportunities" element={<Opportunities />} />
                <Route path="ai-applications" element={<AIStrategy />} />
                <Route path="ai-use" element={<AIResponsibleUse />} />
                <Route path="ai-tech-enablement" element={<AITechEnablement />} />
                <Route path="final-result" element={<FinalResult />} />
            </Route>
        </Routes>
        </AppProvider>
        <ToastContainer/>
        </>

  );
}

export default App;
