import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Test = () => {
  const success = () => {
    toast.success("Success");
  };

  const error = () => {
    toast.error("Error");
  };

  return (
    <div className="grid grid-cols-2 mt-20 border border-black place-items-center">
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
    </div>
  );
};

export default Test;
