import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/features/mutualfund/components/SectionHeading";
import { formatToINR } from "@/utils/formatters";
import { useGetBalance } from "@/hooks/useGetBalance";
import { formatDate } from "date-fns";
import { ChevronRightIcon, QrCodeIcon, ScanLineIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import MyQrCodeDrawer from "../components/MyQrCodeDrawer";
import QrReader from "../components/QrReader";
import { useGetAllTnx } from "../hooks/useGetAllTnx";
import { assetConfig } from "../utils/constants";
import { getLatestTnx } from "../utils/getLatestTnx";
import NumberFlow from "@number-flow/react";

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
          <NumberFlow value={balance || 0} prefix="₹" />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler text-primary icons-tabler-outline icon-tabler-brand-telegram fill size-8 sm:size-10"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
            </svg>{" "}
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
            <ScanLineIcon className="text-primary size-8 stroke-[2.4px] sm:size-10" />
          </Button>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            Scan & Pay
          </p>
        </div>

        <div className="Slot flex flex-col items-center justify-center">
          <MyQrCodeDrawer>
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-22 rounded-xl sm:h-22 sm:w-38"
            >
              <QrCodeIcon className="text-primary size-8.5 sm:size-10" />
            </Button>
          </MyQrCodeDrawer>
          <p className="mt-3 text-center text-sm font-medium sm:mt-4 sm:text-base">
            My QR Code
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
              className="mx-auto size-40 sm:size-60"
            />
            <p className="mt-2 text-center text-sm font-medium sm:text-base">
              No Pending Money Requests
            </p>
          </div>
        </Card>
      </section>

      {tnxHistory && (
        <section className="mt-20 pb-20">
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
          <Link
            to="/wallet/transactions"
            className="flex items-center justify-between gap-1 border-y py-4 text-sm font-medium sm:px-4"
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
