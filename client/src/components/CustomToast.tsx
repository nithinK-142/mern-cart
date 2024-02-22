import { icons } from "@/assets/icons";
import toast from "react-hot-toast";

export const WelcomeToast = (username: string | undefined) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-[10rem] w-full bg-[#333] dark:text-black text-[#fff] dark:bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <p className="text-sm font-medium text-center">
            Welcome, {username} 👏
          </p>
        </div>
      </div>
    ),
    { duration: 1000 }
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
        backgroundColor: "#99cc99",
      },
    }
  );
};

export const SuccessToast = (message: string) => {
  toast.success(message);
};

export const ErrorToast = (message: string) => {
  toast.error(message);
};
