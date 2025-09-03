import GoBackBar from "@/components/GoBackBar";
import { CheckCircle, ChevronRightIcon, Clock, Clock4Icon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useGetOrderDetail } from "../hooks/queries/internalQueries";
import { formatToINR } from "../utils/formaters";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const helperConfig = {
  ONE_TIME: "One-Time",
  NEW_SIP: "New SIP",
  REDEEM: "Redeem",
};

const statusConfig = {
  PENDING: "In Progress",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

function OrderDetailsPage() {
  const { orderId } = useParams();

  const { data: order = {} } = useGetOrderDetail(orderId);

  return (
    <div>
      <GoBackBar title="Order Details" />
      <div className="px-4">
        <div className="space-y-4">
          <Clock4Icon className="fill-primary size-10 text-white" />

          <div>
            <h2 className="text-xl font-medium">
              {formatToINR(order.amount, 2)}
            </h2>
            <span className="text-muted-foreground mt-2 space-x-6 text-xs">
              {helperConfig[order.orderType]} • {statusConfig[order.status]}
            </span>
          </div>

          <Link
            to={`/mutual-funds/${order.schemeCode}`}
            className="text-md text-muted-foreground flex items-center gap-4"
          >
            <span className="text-sm">{order.fundName}</span>
            <ChevronRightIcon className="size-5" />
          </Link>

          <div className="flex justify-between border-y py-4">
            <div>
              <span className="text-muted-foreground text-xs">
                Completion By
              </span>
              <h4 className="text-sm font-medium">
                {order.processDate && format(order.processDate, "dd MMM yy")}
              </h4>
            </div>

            <div className="w-1/2 border-l pl-6">
              <span className="text-muted-foreground text-xs">
                Expected NAV Date
              </span>
              <h4 className="text-sm font-medium">
                {order.navDate && format(order.navDate, "dd MMM yy")}
              </h4>
            </div>
          </div>
        </div>

        <StatusTimeline order={order} />

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md">Details</AccordionTrigger>

            <AccordionContent className="text-muted-foreground space-y-4">
              <div className="space-x-8">
                <span>Placed on:</span>
                <span className="font-medium">
                  {order.createdAt &&
                    format(order.createdAt, "dd MMM yy, h:mm a")}
                </span>
              </div>
              <div className="space-x-10">
                <span>Paid Via:</span>
                <span className="font-medium">
                  Vestiify Wallet (Virtual Money)
                </span>
              </div>
              <div className="space-x-10">
                <span>Order ID:</span>
                <span className="font-medium">{order.id}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
export default OrderDetailsPage;

export function StatusTimeline({ order }) {
  const steps = [
    {
      id: 1,
      label: "Payment confirmed",
      date: order.createdAt && format(order.createdAt, "dd MMM yy, h:mm a"),
      completed: true,
    },
    {
      id: 2,
      label:
        order.status === "PENDING" ? "Order to be process" : "Order processed",
      date: order.processDate && format(order.processDate, "dd MMM yy"),
      completed: order.status === "PENDING" ? false : true,
    },
  ];

  return (
    <div className="border-b py-6">
      <h2 className="text-md mb-4 font-medium">Status</h2>
      <div className="relative space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start gap-3">
            {/* Vertical line */}
            {index !== steps.length - 1 && (
              <div className="absolute top-6 left-[10px] h-full w-px bg-gray-300"></div>
            )}

            {/* Icon */}
            <div className="bg-background z-10 mt-0.5">
              {step.completed ? (
                <CheckCircle className="text-primary size-5" />
              ) : (
                <Clock className="text-primary size-5" />
              )}
            </div>

            {/* Text */}
            <div className="space-y-2">
              <p
                className={`text-sm font-medium ${
                  step.completed && "text-muted-foreground"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-500">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
