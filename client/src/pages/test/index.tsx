import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Test = () => {
  const success = () => {
    toast.success("Success");
  };

  const error = () => {
    toast.error("Error");
  };

  const username = localStorage.getItem("username");
  const custom = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-[10rem] w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        style={{
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }}
      >
        <div className="flex-1 w-0 p-4">
          <p className="text-sm font-medium text-center">
            Welcome, {username} 👏
          </p>
        </div>
      </div>
    ));
  };
  return (
    <div className="grid grid-cols-3 gap-4 mt-20 border border-black place-items-center">
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
      <Button onClick={custom}>custom</Button>
      {/* <Button onClick={success}></Button>
      <Button onClick={success}></Button> */}
    </div>
  );
};

export default Test;
