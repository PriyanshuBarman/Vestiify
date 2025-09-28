import { useNavigate } from "react-router";
import { useGetAllOrders } from "../hooks/useGetAllOrders";
import { formatToINR } from "@/utils/formatters";
import GoBackBar from "@/components/GoBackBar";

const OrderTypeConfig = {
  ONE_TIME: "One-Time",
  SIP_INSTALLMENT: "SIP Installment",
  NEW_SIP: "New SIP",
  REDEEM: "Redeem",
};

const statusConfig = {
  PENDING: "In Progress",
  COMPLETED: "Success",
  FAILED: "Failed",
};

function AllOrdersPage() {
  const { data: orders } = useGetAllOrders();
  const navigate = useNavigate();

  if (!orders) {
    return (
      <div className="h-svh">
        <GoBackBar title="All Orders" />
        <h3 className="mt-[50%] text-center">
          You have not placed any Mutual Fund orders yet
        </h3>
      </div>
    );
  }

  return (
    <div>
      <GoBackBar title="All Orders" />
      <div className="px-4">
        {orders?.map((order) => (
          <div
            onClick={() => navigate(`/mutual-funds/order/${order.id}`)}
            key={order.id}
            className="flex justify-between border-b py-4"
          >
            <div className="max-w-[60%]">
              <h4 className="sm:text-md truncate sm:font-medium">
                {order.fundName}
              </h4>
              <p className="text-muted-foreground mt-2 text-sm">
                {OrderTypeConfig[order.orderType]}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[14px] font-medium tabular-nums sm:text-base">
                {formatToINR(order.amount, 2)}
              </span>
              <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                <div className="bg-primary size-2 rounded-full"></div>
                <span>{statusConfig[order.status]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AllOrdersPage;
