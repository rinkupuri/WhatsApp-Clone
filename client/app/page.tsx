import ChatPart from "@/components/Parts/ChatPart";
import UserPart from "@/components/Parts/UserPart";

export default function Home() {
  return (
    <>
      <div className="flex  h-screen justify-center py-4">
        <div className="flex border-[1px] w-11/12 xl:my-4">
          <div className="flex-[1] border-[1px]">
            <UserPart />
          </div>
          <div className="flex-[2.5] border-t-[1px]">
            <ChatPart />
          </div>
        </div>
      </div>
    </>
  );
}
