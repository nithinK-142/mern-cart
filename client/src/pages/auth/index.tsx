import axios from "axios";
import { SyntheticEvent, useContext, useState } from "react";
import { UserErrors } from "../../models/errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./style.css";
import spinner from "../../assets/spinner.svg";
import toast from "react-hot-toast";

export const AuthPage = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        username,
        password,
      });
      toast.success("Registration Complete, now please login!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS)
        toast.error("ERROR: Username already in use!");
      else toast.error("ERROR: Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="form-group">
          <label htmlFor="register-username">Username: </label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="register-password">Password: </label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit">
          {loading ? (
            <span>
              Registering <img id="register" src={spinner} alt="spinner" />
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          username,
          password,
        }
      );
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
      toast.success("Successfully logged in!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesnt exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username or password";
          break;
        default:
          errorMessage = "Something went wrong!";
      }
      toast.error("ERROR: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="login-username">Username: </label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password: </label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit">
          {loading ? (
            <span>
              Logging in <img id="login" src={spinner} alt="spinner" />
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};
