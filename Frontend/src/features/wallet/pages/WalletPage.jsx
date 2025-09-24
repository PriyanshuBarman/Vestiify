import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/features/mutualfund/components/SectionHeading";
import { formatToINR } from "@/features/mutualfund/utils/formaters";
import { useGetBalance } from "@/hooks/queries/internalQueries";
import { formatDate } from "date-fns";
import {
  ChevronRightIcon,
  IndianRupeeIcon,
  ScanLine,
  UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useGetAllTnx } from "../hooks/queries/internalQueries";
import { assetConfig } from "../utils/constants";
import { getLatestTnx } from "../utils/getLatestTnx";
import QrReader from "../components/QrReader";
import { useState } from "react";
import { toast } from "sonner";

function WalletPage() {
  const navigate = useNavigate();
  const { data: balance } = useGetBalance();
  const { data: tnxHistory } = useGetAllTnx();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="mt-4 space-y-8 px-4 sm:mx-auto sm:w-2xl sm:space-y-12">
      <h2 className="space-x-2 leading-0">
        <span className="font-[450] italic">Balance.</span>
        <span className="text-2xl font-semibold tabular-nums">
          {formatToINR(balance)}
        </span>
      </h2>

      {/* Quick Options */}
      <section className="flex justify-between">
        <div className="Slot flex flex-col items-center justify-center">
          <Button
            onClick={() => navigate("/wallet/send")}
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <UserIcon className="text-primary size-6.5 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Send Money
          </p>
        </div>

        <div className="Slot flex flex-col items-center justify-center">
          <QrReader isOpen={isScannerOpen} setIsOpen={setIsScannerOpen} />
          <Button
            onClick={() => setIsScannerOpen(true)}
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <ScanLine className="text-primary size-6.5 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Scan & Pay
          </p>
        </div>

        <div className="Slot flex flex-col items-center justify-center">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
          >
            <IndianRupeeIcon className="text-primary size-6.5 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Request Money
          </p>
        </div>
      </section>

      {/* Money Requests */}
      <section className="space-y-4">
        <SectionHeading heading="Money Requests" className="px-0" />
        <Card>
          <div>
            <img
              src="Notebook-bro.svg"
              alt=""
              className="mx-auto size-50 sm:size-70"
            />
            <p className="mt-2 text-center text-sm font-medium sm:text-base">
              No Pending Money Requests
            </p>
          </div>
        </Card>
      </section>

      {tnxHistory && (
        <section className="pb-20">
          <SectionHeading
            heading="Recent Transactions"
            subHeading="View all"
            navigateTo="/wallet/transactions"
            className="px-0"
          />

          <ul>
            {getLatestTnx(tnxHistory, 6)?.map((tnx) => (
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
                    {tnx.peerUser?.profile?.fullName?.charAt(0) ||
                      tnx.assetCategory?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between">
                  <h3 className="text-sm font-medium capitalize">
                    {tnx.peerUser?.profile?.fullName ||
                      assetConfig[tnx.assetCategory]?.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {formatDate(tnx.createdAt, "dd MMM yy, h:mm a")}
                  </p>
                </div>

                <div className="ml-auto flex flex-col items-end justify-between">
                  <div
                    className={`${tnx.type === "CREDIT" && "text-positive"} text-sm font-medium tabular-nums`}
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
          <Link
            to="/wallet/transactions"
            className="flex items-center justify-between gap-1 border-y px-4 py-4 text-sm font-medium"
          >
            <span>View all</span>
            <ChevronRightIcon size={20} />
          </Link>
        </section>
      )}
    </div>
  );
}
export default WalletPage;
