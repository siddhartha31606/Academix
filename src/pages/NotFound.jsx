import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
