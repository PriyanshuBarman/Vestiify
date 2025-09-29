import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatToINR } from "@/utils/formatters";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router";
import { useGetAllTnx } from "../hooks/useGetAllTnx";
import { assetConfig } from "../utils/constants";

function TnxHistoryPage() {
  const navigate = useNavigate();
  const { data } = useGetAllTnx();

  return (
    <div className="mx-auto sm:w-xl">
      <GoBackBar title="All Transactions" />
      <ul className="space-y-2">
        {data?.map((monthGroup) => (
          <div key={monthGroup.month}>
            {/* Month Header */}
            <div className="bg-accent/50 flex justify-between px-4 py-4 text-sm font-medium">
              <span>{monthGroup.month}</span>
              <span>
                <span className="mr-0.5">
                  {monthGroup.summary > 0 ? "+" : "-"}
                </span>
                {formatToINR(monthGroup.summary)}
              </span>
            </div>

            {/* Transactions */}
            <ul className="px-4">
              {monthGroup.transactions.map((tnx) => (
                <li
                  key={tnx.id}
                  className="hover:bg-accent flex cursor-pointer gap-4 border-b py-4"
                >
                  <Avatar className="size-9">
                    <AvatarImage
                      src={
                        tnx.peerUser?.profile?.avatar ||
                        assetConfig[tnx.assetCategory]?.img
                      }
                    />
                    <AvatarFallback className="text-sm uppercase">
                      {tnx.peerUser?.profile?.name?.charAt(0) ||
                        tnx.assetCategory?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-between gap-1.5">
                    <h3 className="text-sm font-medium capitalize">
                      {tnx.peerUser?.profile?.name ||
                        assetConfig[tnx.assetCategory]?.name}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(tnx.createdAt, "dd MMM yy, h:mm a")}
                    </p>
                  </div>

                  <div className="ml-auto flex flex-col items-end justify-between gap-1.5">
                    <div
                      className={`${tnx.type === "CREDIT" && "text-positive"} text-sm font-[550] tabular-nums`}
                    >
                      <span className="mr-0.5">
                        {tnx.type === "CREDIT" ? "+" : "-"}
                      </span>
                      {formatToINR(tnx.amount)}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Bal. {formatToINR(tnx.updatedBalance)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TnxHistoryPage;
