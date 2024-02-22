import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { BellIcon } from "lucide-react";
import { icons } from "@/assets/icons";

const Notifications = () => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger>
        <BellIcon className="w-6 h-6 cursor-pointer" />
      </HoverCardTrigger>
      <HoverCardContent>
        <h2 className="font-semibold">Notifications</h2>
        <div className="flex flex-col py-2">
          <div className="flex items-center justify-between py-2 hover:bg-gradient-to-b hover:from-muted/50 to-muted">
            <div className="relative flex items-center">
              <div className="absolute inline-block p-1 bg-blue-600 rounded-full -left-1" />
              <span className="pl-2">item added to cart</span>
            </div>
            <span className="h-6">{icons.trashBin}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Notifications;
