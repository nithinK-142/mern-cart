import { icons } from "@/assets/icons";
import toast from "react-hot-toast";

export const WelcomeToast = (username: string | undefined) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-[#333] dark:text-black text-[#fff] dark:bg-white flex space-x-2 px-4 py-2.5 rounded-lg shadow-lg`}
      >
        <p className="text-sm font-medium text-center">
          Welcome, {username} 👏
        </p>
      </div>
    ),
    { duration: 2000 }
  );
};

export const CartToast = (productname: string) => {
  // toast(`${productname} added to 🛒`, {
  //   style: {
  //     fontWeight: "bold",
  //     opacity: "0",
  //   },
  // });

  toast(
    () => (
      <div className="flex space-x-2">
        <span className="font-semibold">{productname}</span>
        <span> added to </span>
        <div className="w-6 h-6">{icons.cart}</div>
      </div>
    ),
    {
      style: {
        backgroundColor: "#A5DD9B",
      },
      duration: 1500,
    }
  );
};

export const SuccessToast = (message: string) => {
  toast.success(message);
};

export const ErrorToast = (message: string) => {
  toast.error(message);
};
