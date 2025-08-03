import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useIsMobile } from "@/hooks/useIsMobile";

function GoBackBar({ title }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="bg-background sticky top-0 z-10 flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        {title && <h1 className="font-medium">{title}</h1>}
      </div>
    </div>
  );
}

export default GoBackBar;
