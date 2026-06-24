import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import BlankLayout from "./BlankLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import HomePage from "../pages/main/HomePage";
import LocationsPage from "../pages/main/LocationsPage";
import DestinationsPage from "../pages/main/DestinationsPage";
import DetailsPage from "../pages/main/DetailsPage";
import BrowseCategories from "../pages/main/BrowseCategories";
import CategoryDetailsPage from "../pages/main/CategoryDetailsPage";
import ContactUsPage from "../pages/main/ContactUsPage";
import AboutPage from "../pages/main/AboutPage";
import UserProfilePage from "../pages/Users/UserProfilePage";
import ProfileSettingsPage from "../pages/Users/ProfileSettingsPage";
import GuestItineraryPage from "../pages/Itinerary/GuestItineraryPage";
import YourJourneysPage from "../pages/Itinerary/YourJourneysPage";
import CreateTripPage from "../pages/Itinerary/CreateTripPage";
import JourneyDetailPage from "../pages/Itinerary/JourneyDetailPage";
import AdminLayout from "../pages/admin/AdminLayout";
import ManagePlaces from "../pages/admin/ManagePlaces";
import ManageReview from "../pages/admin/ManageReview";
import ManageCategory from "../pages/admin/ManageCategory";
import ManageContacts from "../pages/admin/ManageContacts";
import AddDestinationPage from "../pages/admin/AddDestinationPage";
import AddCategoryPage from "../pages/admin/AddCategoryPage";
import ManageLocations from "../pages/admin/ManageLocations";
import AddLocationPage from "../pages/admin/AddLocationPage";
import DashboardPage from "../pages/admin/DashboardPage";
import SuperAdminLayout from "../pages/super-admin/SuperAdminLayout";
import ManageUsersPage from "../pages/super-admin/ManageUsersPage";
import CreateUserPage from "../pages/super-admin/CreateUserPage";
import NotFound from "../pages/NotFound";
import { getAuthUser, getRoleDestination } from "../utils/authRole";

const AdminRoutesShell = ({ element }) => <AdminLayout>{element}</AdminLayout>;
const SuperAdminRoutesShell = ({ element }) => (
  <SuperAdminLayout>{element}</SuperAdminLayout>
);

const ItineraryRoutesShell = () => {
  const { email } = getAuthUser();
  return email ? <YourJourneysPage /> : <GuestItineraryPage />;
};

const CreateTripRoutesShell = () => {
  const { email } = getAuthUser();
  return email ? <CreateTripPage /> : <Navigate to="/itinerary" replace />;
};

const JourneyDetailRoutesShell = () => {
  const { email } = getAuthUser();
  return email ? <JourneyDetailPage /> : <Navigate to="/login" replace />;
};

const RoleGuard = ({ allowedRoles, element }) => {
  const { email, role } = getAuthUser();

  if (!email) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) {
    return <Navigate to={getRoleDestination(role) || "/"} replace />;
  }

  return element;
};

const AdminEntryRoute = () => {
  const { email, role } = getAuthUser();

  if (!email) return <Navigate to="/login" replace />;
  if (role === "superadmin")
    return <Navigate to="/super-admin/dashboard" replace />;
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return <Navigate to="/" replace />;
};

const SuperAdminEntryRoute = () => {
  const { email, role } = getAuthUser();

  if (!email) return <Navigate to="/login" replace />;
  if (role === "superadmin")
    return <Navigate to="/super-admin/dashboard" replace />;

  return <Navigate to={getRoleDestination(role) || "/"} replace />;
};

export default function AppRouters() {
  return (
    <div className="page-fade">
      <Routes>
        {/* Have Nav & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route
            path="/destinations/:provinceSlug"
            element={<DestinationsPage />}
          />
          <Route path="/details" element={<DetailsPage />} />
          <Route
            path="/details/:provinceSlug/:placeSlug"
            element={<DetailsPage />}
          />
          <Route path="/categories" element={<BrowseCategories />} />
          <Route path="/categories/:slug" element={<CategoryDetailsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/itinerary" element={<ItineraryRoutesShell />} />
          <Route path="/itinerary/create" element={<CreateTripRoutesShell />} />
          <Route
            path="/itinerary/:journeyId"
            element={<JourneyDetailRoutesShell />}
          />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/settings" element={<ProfileSettingsPage />} />
        </Route>

        {/* Auth pages: No Nav & Footer */}
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminEntryRoute />} />
        <Route
          path="/admin/dashboard"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<DashboardPage />} />}
            />
          }
        />
        <Route
          path="/admin/places"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<ManagePlaces />} />}
            />
          }
        />
        <Route
          path="/admin/categories"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<ManageCategory />} />}
            />
          }
        />
        <Route
          path="/admin/locations"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<ManageLocations />} />}
            />
          }
        />
        <Route
          path="/admin/add-location"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<AddLocationPage />} />}
            />
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<ManageReview />} />}
            />
          }
        />
        <Route
          path="/admin/add-destination"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<AddDestinationPage />} />}
            />
          }
        />
        <Route
          path="/admin/add-category"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<AddCategoryPage />} />}
            />
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <RoleGuard
              allowedRoles={["admin"]}
              element={<AdminRoutesShell element={<ManageContacts />} />}
            />
          }
        />

        {/* Super Admin routes */}
        <Route path="/super-admin" element={<SuperAdminEntryRoute />} />
        <Route
          path="/super-admin/dashboard"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<DashboardPage />} />}
            />
          }
        />
        <Route
          path="/super-admin/users"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<ManageUsersPage />} />}
            />
          }
        />
        <Route
          path="/super-admin/create-user"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<CreateUserPage />} />}
            />
          }
        />
        <Route
          path="/super-admin/places"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<ManagePlaces />} />}
            />
          }
        />
        <Route
          path="/super-admin/categories"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<ManageCategory />} />}
            />
          }
        />
        <Route
          path="/super-admin/locations"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<ManageLocations />} />}
            />
          }
        />
        <Route
          path="/super-admin/add-location"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<AddLocationPage />} />}
            />
          }
        />
        <Route
          path="/super-admin/reviews"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<ManageReview />} />}
            />
          }
        />
        <Route
          path="/super-admin/add-destination"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={
                <SuperAdminRoutesShell element={<AddDestinationPage />} />
              }
            />
          }
        />
        <Route
          path="/super-admin/add-category"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<AddCategoryPage />} />}
            />
          }
        />
        <Route
          path="/super-admin/contacts"
          element={
            <RoleGuard
              allowedRoles={["superadmin"]}
              element={<SuperAdminRoutesShell element={<ManageContacts />} />}
            />
          }
        />

        {/* Not Found */}
        <Route element={<BlankLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
