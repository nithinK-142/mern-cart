import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Test = () => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>Dropdown Menu</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DialogTrigger>
              <DropdownMenuItem>
                <div>"Test"</div>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent">
          This is a modal.
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Test;
