import { Link } from "react-router-dom";
import CartSVG from "../assets/cart.svg";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>MERN Cart</h1>
      </div>
      <div className="navbar-links">
        <Link to={"/"}>Shop</Link>
        <Link to={"/purchased-items"}>Purchases</Link>
        <Link to={"/checkout"}>
          <img src={CartSVG} alt="Cart" />
        </Link>
      </div>
    </div>
  );
};
