import { Avatar, AvatarFallback } from "../ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiLogout, CiSettings, CiUser } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserHeaders = () => {
  return (
    <div className="w-full flex justify-between items-center px-4 bg-primary  shadow h-[60px]">
      <div className="flex">
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDotsVertical size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>
              <CiUser size={22} /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CiSettings size={22} /> Setting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CiLogout size={22} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserHeaders;
