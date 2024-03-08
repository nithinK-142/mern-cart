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

export const CartAddToast = (productname: string) => {
  // toast(`${productname} added to 🛒`, {
  //   style: {
  //     fontWeight: "bold",
  //     opacity: "0",
  //   },
  // });

  toast(
    () => (
      <div className="flex space-x-2 text-sm text-black/80">
        <span className="font-semibold">{productname}</span>
        <span> added to </span>
        <div className="w-5 h-5">{icons.cart}</div>
      </div>
    ),
    {
      style: {
        backgroundColor: "#A5DD9B",
      },
      duration: 1500,
      position: "bottom-right",
    }
  );
};

export const CartRemoveToast = (productname: string) => {
  toast(
    () => (
      <div className="flex space-x-2 text-sm text-gray-900">
        <span className="font-semibold">{productname}</span>
        <span> removed from </span>
        <div className="w-5 h-5 fill-gray-900">{icons.cart}</div>
      </div>
    ),
    {
      style: {
        backgroundColor: "#ff6666",
      },
      duration: 1500,
      position: "bottom-right",
    }
  );
};

export const SuccessToast = (message: string) => toast.success(message);

export const ErrorToast = (message: string) => toast.error(message);
