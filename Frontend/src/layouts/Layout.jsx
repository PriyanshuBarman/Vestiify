import ReusableDialog from "@/components/ResueableDialog";
import { useClaimDailyReward } from "@/hooks/mutations/mutation";
import { isToday } from "date-fns";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import BottomNavbar from "./BottomNavbar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  const navigate = useNavigate();
  const { mutate, data, isSuccess, error } = useClaimDailyReward();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const lastRewardedAt = localStorage.getItem("lastRewardedAt");
    if (!isToday(new Date(lastRewardedAt))) {
      mutate();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setDialogOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTop />
      <BottomNavbar />
      <ReusableDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="₹1000 Added!"
        description="Your daily reward has been credited. Note: visit everyday to get 1000 reward daily"
        icon={<img src="/Piggy bank-amico.svg" className="size-50" />}
        onConfirm={() => navigate("/wallet")}
        confirmButtonText="Check Balance"
      />
    </>
  );
}

export default Layout;
