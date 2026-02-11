import { React, } from "react";
import AddProduct from "./admin_pages/AddProduct";
import AdminDashboardOffer from "./admin_pages/AdminDashboardOffer";
import AdminOfferForm from "./admin_pages/AdminOfferForm";
import AdminPreorderForm from "./admin_pages/AdminPreorderForm";

const LandingPage = () => {


  return (
    <div className="">

      <section id="hero border-2">
        <AddProduct />
      </section>

      <section id="shop border-">
        <AdminDashboardOffer />
      </section>

      <section id="preorder border-">
        <AdminOfferForm />
      </section>
      
      <section id="sale border-m">
        <AdminPreorderForm />
      </section>

      <section id="contact border-">
        
      </section>

      <section id="reviews border-">
        
      </section>
    </div>
  );
};

export default LandingPage;
