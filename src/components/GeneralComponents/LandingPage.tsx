import Footer from "@/components/GeneralComponents/Footer";
import NavBar from "@/components/GeneralComponents/NavBar";
import HomeBodyComponent from "@/components/HomeComponents/HomeBodyComponent";
import SwiperComponent from "@/components/SwiperComponents/SwiperComponent";
import TestmoniesComponent from "@/components/TestmoniesComponents/TestmoniesComponent";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <SwiperComponent />
      <HomeBodyComponent />
      <TestmoniesComponent />
      <Footer />
    </>
  );
}
