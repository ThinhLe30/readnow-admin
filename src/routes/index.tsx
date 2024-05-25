import { SITE_MAP } from "@/utils/constants/Path";

import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "@/container/Loading";

const AdminPage = lazy(() => import("../pages/admin"));

const CategoriesPage = lazy(() => import("../pages/admin/categories"));
const ArticlesPage = lazy(() => import("../pages/admin/articles"));

const LoginPage = lazy(() => import("../pages/auth/Login"));

const MainRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
            <Route
              index
              element={<Navigate to={SITE_MAP.CATEGORIES} replace />}
            />
            <Route path={SITE_MAP.CATEGORIES} element={<CategoriesPage />} />
            <Route path={SITE_MAP.ARTICLES} element={<ArticlesPage />} />
          </Route>
          <Route path={SITE_MAP.AUTH.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MainRoute;
