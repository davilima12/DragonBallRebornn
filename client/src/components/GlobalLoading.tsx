import { useLoading } from "@/contexts/LoadingContext";

export default function GlobalLoading() {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      data-testid="global-loading"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Energy Sphere Animation - DBZ Style */}
        <div className="relative w-24 h-24">
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 opacity-20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 opacity-40 animate-pulse"></div>
          
          {/* Main energy core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500 shadow-lg shadow-orange-500/50 animate-spin-slow">
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-yellow-200 via-white to-orange-300 opacity-80"></div>
          </div>
          
          {/* Inner bright spot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white shadow-lg shadow-yellow-300/80 animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground animate-pulse" data-testid="loading-message">
            {loadingMessage}
          </p>
          <div className="flex gap-1 justify-center mt-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
