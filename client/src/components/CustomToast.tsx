import toast from "react-hot-toast";

const CustomToast = (username: string | undefined) => {
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

export default CustomToast;
