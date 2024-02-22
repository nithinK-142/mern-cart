import { SuccessToast, ErrorToast } from "@/components/CustomToast";
import { Button } from "@/components/ui/button";

const Test = () => {
  const success = () => {
    SuccessToast("Success");
  };

  const error = () => {
    ErrorToast("Error");
  };

  return (
    <div className="grid grid-cols-2 mt-20 border border-black place-items-center">
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
    </div>
  );
};

export default Test;
