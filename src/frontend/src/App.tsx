import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import Booking from "@/pages/Booking";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </LanguageProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: Booking,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  galleryRoute,
  aboutRoute,
  bookingRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
