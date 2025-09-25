import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { signupUser } from "../services/services";
import { Loader2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export function SignupForm({ className, ...props }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [data, submitAction, isPending] = useActionState(signupUser);
  const { googleLogin, isLoading } = useGoogleAuth();

  useEffect(() => {
    if (!data) return;
    if (data?.success) {
      navigate("/auth/pin-setup");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    } else {
      toast.error(data?.message);
    }
  }, [data]);

  return (
    <form
      action={submitAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-medium sm:text-2xl sm:font-bold">
          Create Your Account
        </h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fullName">Name</Label>
          <Input
            defaultValue={data?.fullName}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            defaultValue={data?.email}
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            defaultValue={data?.password}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <Button
          size="lg"
          disabled={isPending || isLoading}
          type="submit"
          className="w-full"
        >
          {isPending || isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Signup"
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          size="lg"
          onClick={googleLogin}
          disabled={isPending || isLoading}
          type="button"
          variant="outline"
          className="w-full"
        >
          <svg
            viewBox="-3 0 262 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            fill="#000000"
            className="size-5"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              ></path>
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              ></path>
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              ></path>
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              ></path>
            </g>
          </svg>
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
