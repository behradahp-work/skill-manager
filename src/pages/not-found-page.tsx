//---------- Packages ----------
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

//---------- Components ----------
import EmptyState from "@/shared/components/shared/empty-state";
import { Button } from "@/shared/components/ui/button";

export default function NotFoundPage() {
  return (
    <>
      <title>Page not found | Skill Manager</title>
      <h1 className="sr-only">Page not found</h1>
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="Use the dashboard to find your way back to your workspace."
        action={
          <Button
            nativeButton={false}
            render={<Link to="/" />}
            className="h-11 px-4"
          >
            Back to dashboard
          </Button>
        }
      />
    </>
  );
}
