import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from "context/AppContext"
import Loader from 'common/Loader';
import DefaultLayout from 'layout/DefaultLayout';
import BusinessContext from "Pages/BusinessContext"
import LinkedAIValue from 'Pages/LinkedAIValue';
import AITechEnablement from 'Pages/AITechEnablement';
import AIResponsibleUse from 'Pages/AIResponsibleUse';
import Test from 'Pages/Test'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


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
      <DefaultLayout>
        <AppProvider>
        <Routes>
          <Route
            index
            element={
                <BusinessContext/>
            }
          />
          <Route
            path="linked-ai-value"
            element={
                <LinkedAIValue />
            }
          />
          <Route
            path="ai-responsible-use"
            element={
                <AIResponsibleUse/>
            }
          />
          <Route
            path="ai-tech-enablement"
            element={
                <AITechEnablement/>
            }
          />
           <Route
            path="test"
            element={
                <Test/>
            }
          />
        </Routes>
        </AppProvider>
      </DefaultLayout>

  );
}

export default App;
