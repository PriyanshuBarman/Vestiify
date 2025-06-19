import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

/**
 * Custom hook for integrating sheet open/close state with browser history.
 * This allows mobile users to close sheets using the back button instead of navigating away.
 */

export function useSheetHistory(stateKey) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const shouldBeOpen = location.state?.[stateKey] === true;
    setIsOpen(shouldBeOpen);
  }, [location.state, stateKey]);

  const handleOpenChange = (open) => {
    setIsOpen(open);

    if (open) {
      navigate(location.pathname + location.search, {
        state: { ...location.state, [stateKey]: true },
        replace: false,
      });
    } else {
      if (location.state?.[stateKey]) {
        navigate(-1);
      }
    }
  };

  return {
    isOpen,
    handleOpenChange,
  };
}
