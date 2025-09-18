import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { loginUser } from "../services/services";

export function LoginForm({ className, ...props }) {
  const [data, submitAction, isPending] = useActionState(loginUser);

  const navigate = useNavigate();
  const googleLogin = useGoogleAuth();

  useEffect(() => {
    if (!data) return;
    if (data?.success) navigate("/mutual-funds#explore", { replace: true });
    toast[data?.success ? "success" : "error"](data?.message);
  }, [data]);

  return (
    <form
      action={submitAction}
      className={cn("flex flex-col gap-10", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-medium sm:text-2xl sm:font-bold">
          Login To Your Account
        </h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            defaultValue={data?.email}
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="py-4.5"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            defaultValue={data?.password}
            type="password"
            id="password"
            name="password"
            required
            className="py-4.5"
          />
        </div>
        <Button size="lg" disabled={isPending} type="submit" className="w-full">
          {isPending ? "Logging.." : "Login"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          size="lg"
          onClick={googleLogin}
          disabled={isPending}
          type="button"
          variant="outline"
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
