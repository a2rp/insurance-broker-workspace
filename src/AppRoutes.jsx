import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/loading/index.jsx";
const Overview = lazy(() => import("./pages/overview/index.jsx"));
const Accounts = lazy(() => import("./pages/accounts/index.jsx"));
const Policies = lazy(() => import("./pages/policies/index.jsx"));
const Renewals = lazy(() => import("./pages/renewals/index.jsx"));
const Service = lazy(() => import("./pages/service/index.jsx"));
const NotFound = lazy(() => import("./pages/notFound/index.jsx"));
const AppRoutes = (props) => {
  const location = useLocation();
  return (
    <Suspense key={location.pathname} fallback={<Loading />}>
      <Routes location={location}>
        <Route path="/" element={<Overview {...props} />} />
        <Route path="/accounts" element={<Accounts {...props} />} />
        <Route path="/policies" element={<Policies {...props} />} />
        <Route path="/renewals" element={<Renewals {...props} />} />
        <Route path="/service" element={<Service {...props} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
