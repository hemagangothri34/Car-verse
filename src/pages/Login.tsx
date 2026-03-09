
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For demo purposes, we'll just simulate a login
    // In a real app, you'd call an API to authenticate
    setTimeout(() => {
      // Simple validation
      if (email && password) {
        // Save user info to localStorage (this is just for demo)
        // In a real app, you'd store a token from your backend
        localStorage.setItem(
          "carverse-user",
          JSON.stringify({
            email,
            name: email.split("@")[0],
          })
        );

        toast({
          title: "Login successful",
          description: "Welcome to CarVerse!",
          duration: 3000,
        });

        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Please enter both email and password",
          variant: "destructive",
          duration: 3000,
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center login-gradient">
      <div className="w-full max-w-md p-4 animate-fade-in">
        <Card className="border-border/50 car-card-gradient">
          <CardHeader className="space-y-1">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">CarVerse</h1>
              <p className="text-muted-foreground">Your ultimate car marketplace</p>
            </div>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Password reset",
                        description: "This feature is not available in the demo.",
                        duration: 3000,
                      });
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
