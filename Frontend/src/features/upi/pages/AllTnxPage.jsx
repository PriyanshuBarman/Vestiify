import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetAllTnx } from "../hooks/queries/internalQueries";
import { formatToINR } from "@/features/mutualfund/utils/formaters";
import { PlusIcon } from "lucide-react";
import GoBackBar from "@/components/GoBackBar";
import { formatDate } from "date-fns";
import { useNavigate } from "react-router";

function AllTnxPage() {
  const navigate = useNavigate();
  const { data } = useGetAllTnx();
  console.log(data);

  return (
    <div>
      <GoBackBar title="All Transactions" />
      <ul className="space-y-2">
        {data?.map((monthGroup) => (
          <div key={monthGroup.month}>
            {/* Month Header */}
            <div className="bg-accent flex justify-between px-4 py-2 text-base font-medium">
              <span>{monthGroup.month}</span>
              {/* <span>{monthGroup.summary}</span> */}
              <span>{formatToINR(monthGroup.summary)}</span>
            </div>

            {/* Transactions */}
            <ul>
              {monthGroup.transactions.map((tnx) => (
                <li
                  onClick={() =>
                    navigate("/upi/transaction-details", { state: tnx })
                  }
                  key={tnx.id}
                  className="hover:bg-accent flex cursor-pointer gap-4 border-b p-4"
                >
                  <Avatar className="size-12">
                    <AvatarImage src={tnx.peerUser?.avatar} />
                    <AvatarFallback />
                  </Avatar>
                  <div className="flex flex-col justify-between">
                    <h3 className="font-medium">{tnx.peerUser?.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {formatDate(tnx.createdAt, "dd MMM yy, h:mm a")}
                    </p>
                  </div>

                  <div
                    className={`${tnx.type === "CREDIT" && "text-positive"} ml-auto font-medium tabular-nums`}
                  >
                    <span className="mr-0.5 text-lg">
                      {tnx.type === "CREDIT" ? "+" : "-"}
                    </span>
                    {formatToINR(tnx.amount)}
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
export default AllTnxPage;
