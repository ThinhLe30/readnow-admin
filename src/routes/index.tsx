import { SITE_MAP } from "@/utils/constants/Path"
import { RequireAuth, RequireAuthAdmin, RequireAuthMod } from "@/layouts/RequireAuth"
import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Loading from "@/container/Loading"
import HomeLayout from "@/layouts/Home"

const HomePage = lazy(() => import("../pages/home"))
const RoomDetailPage = lazy(() => import("../pages/home/room-detail"))
const RequestRentPage = lazy(() => import("../pages/home/room-detail/request-rent"))
const MyProfilePage = lazy(() => import("../pages/home/my-profile"))
const MyChecklistPage = lazy(() => import("../pages/home/my-checklist"))
const MyRentalPage = lazy(() => import("../pages/home/my-rental"))
const MyRentalDetailPage = lazy(() => import("../pages/home/my-rental/detail"))
const MyPaymentPage = lazy(() => import("../pages/home/my-payment"))
const MyPaymentDetailPage = lazy(() => import("../pages/home/my-payment/detail"))
const MyStatisticsPage = lazy(() => import("../pages/home/my-statistic"))
const BecomeHostPage = lazy(() => import("../pages/home/become-host"))

const AdminPage = lazy(() => import("../pages/admin"))
const ModPage = lazy(() => import("../pages/mod"))
const UsersPage = lazy(() => import("../pages/admin/users"))
const BlocksPage = lazy(() => import("../pages/admin/blocks"))
const RoomsPage = lazy(() => import("../pages/mod/room/Rooms"))
const UtilitiesPage = lazy(() => import("../pages/admin/utilities"))
const RentalsPage = lazy(() => import("../pages/admin/rentals"))
const PaymentsPage = lazy(() => import("../pages/admin/payments"))
const TransatcionsPage = lazy(() => import("../pages/admin/transactions"))
const StatisticsPage = lazy(() => import("../pages/admin/statistics"))
const GenerateRoomsPage = lazy(() => import("../pages/mod/room/GenerateRooms"))
const AdminRoomsManagementPage = lazy(() => import("../pages/admin/room/Rooms"))

const LoginPage = lazy(() => import("../pages/auth/Login"))
const RegisterPage = lazy(() => import("../pages/auth/Register"))
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPassword"))
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPassword"))

const MainRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                    <Route path={SITE_MAP.INDEX} element={<HomeLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path={SITE_MAP.ROOM_DETAIL} element={<RoomDetailPage />} />
                        <Route element={<RequireAuth />}>
                            <Route path={SITE_MAP.RENT_DETAIL} element={<RequestRentPage />} />
                            <Route path={SITE_MAP.MY_PROFILE} element={<MyProfilePage />} />
                            <Route path={SITE_MAP.MY_CHECKLIST} element={<MyChecklistPage />} />
                            <Route path={SITE_MAP.MY_RENTAL} element={<MyRentalPage />} />
                            <Route path={SITE_MAP.MY_RENTAL_DETAIL} element={<MyRentalDetailPage />} />
                            <Route path={SITE_MAP.MY_PAYMENT} element={<MyPaymentPage />} />
                            <Route path={SITE_MAP.MY_PAYMENT_DETAIL} element={<MyPaymentDetailPage />} />
                            <Route path={SITE_MAP.MY_STATISTICS} element={<MyStatisticsPage />} />
                            <Route path={SITE_MAP.BECOME_HOST} element={<BecomeHostPage />} />
                        </Route>
                    </Route>

                    <Route element={<RequireAuthAdmin />}>
                        <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
                            <Route index element={<Navigate to={SITE_MAP.USERS} replace />} />
                            <Route path={SITE_MAP.USERS} element={<UsersPage />} />
                            <Route path={SITE_MAP.BLOCKS} element={<BlocksPage />} />
                            <Route path={SITE_MAP.ROOMS} element={<AdminRoomsManagementPage />} />
                            <Route path={SITE_MAP.UTILITIES} element={<UtilitiesPage />} />
                            <Route path={SITE_MAP.TRANSACTIONS} element={<TransatcionsPage />} />
                            <Route path={SITE_MAP.RENTALS} element={<RentalsPage />} />
                            <Route path={SITE_MAP.PAYMENTS} element={<PaymentsPage />} />
                            <Route path={SITE_MAP.STATISTICS} element={<StatisticsPage />} />
                        </Route>
                    </Route>

                    <Route element={<RequireAuthMod />}>
                        <Route path={SITE_MAP.MOD} element={<ModPage />}>
                            <Route index element={<Navigate to={SITE_MAP.BLOCKS} replace />} />
                            <Route path={SITE_MAP.BLOCKS} element={<BlocksPage />} />
                            <Route path={SITE_MAP.ROOMS} element={<RoomsPage />} />
                            <Route path={SITE_MAP.ROOMS_GENERATION} element={<GenerateRoomsPage />} />
                            <Route path={SITE_MAP.UTILITIES} element={<UtilitiesPage />} />
                            <Route path={SITE_MAP.TRANSACTIONS} element={<TransatcionsPage />} />
                            <Route path={SITE_MAP.RENTALS} element={<RentalsPage />} />
                            <Route path={SITE_MAP.PAYMENTS} element={<PaymentsPage />} />
                            <Route path={SITE_MAP.STATISTICS} element={<StatisticsPage />} />
                        </Route>
                    </Route>

                    <Route path={SITE_MAP.AUTH.LOGIN} element={<LoginPage />} />
                    <Route path={SITE_MAP.AUTH.REGISTER} element={<RegisterPage />} />
                    <Route path={SITE_MAP.AUTH.FORGOTPASSWORD} element={<ForgotPasswordPage />} />
                    <Route path={SITE_MAP.AUTH.RESETPASSWORD} element={<ResetPasswordPage />} />

                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default MainRoute
