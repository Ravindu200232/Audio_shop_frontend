import { Link, Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contacts";
import Gallery from "./gallery";
import Item from "./item";
import Home from "./home";
import ErrorNotFound from "./error";
import Footer from "../../components/footer";
import ProductOverview from "./productOverview";

export default function HomePage() {
  return (
    <div className="w-screen h-screen ">
      <header>
        <Header />
      </header>
      <div className="w-full h-full ">
        <Routes path="/*">
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/item" element={<Item />} />
          <Route path="/product/:key" element={<ProductOverview />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<ErrorNotFound />} />
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
