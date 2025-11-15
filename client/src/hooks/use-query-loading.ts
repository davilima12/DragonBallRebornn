import { useEffect, useRef } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useLoading, LOADING_PRIORITY } from "@/contexts/LoadingContext";

export function useQueryLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { showLoading } = useLoading();
  const hideLoadingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      // Only show loading if not already showing
      if (!hideLoadingRef.current) {
        // Use BACKGROUND priority so manual operations take precedence
        hideLoadingRef.current = showLoading("Carregando dados...", LOADING_PRIORITY.BACKGROUND);
      }
    } else {
      // Hide loading if it was shown
      if (hideLoadingRef.current) {
        hideLoadingRef.current();
        hideLoadingRef.current = null;
      }
    }
  }, [isFetching, isMutating, showLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideLoadingRef.current) {
        hideLoadingRef.current();
      }
    };
  }, []);
}
