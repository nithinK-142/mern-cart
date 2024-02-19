import { Link } from "react-router-dom";
import CartSVG from "@/assets/cart.svg";
import { useContext } from "react";
import { IShopContext, ShopContext } from "@/context/shop-context";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
    toast.success("Successfully logged out!");
  };
  return (
    <div className="navbar">
      <div className="navbar-title">
        <Link to={"/"}>
          <h1>MERN Cart</h1>
        </Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated && (
          <>
            <Link to={"/"}>Shop</Link>
            <Link to={"/purchased-items"}>Purchases</Link>
            <Link to={"/checkout"}>
              <img src={CartSVG} alt="Cart" />
            </Link>
            <Link to="/auth" onClick={logout}>
              Logout
            </Link>
            <span>$:{availableMoney.toFixed(2)}</span>
          </>
        )}
      </div>
    </div>
  );
};
