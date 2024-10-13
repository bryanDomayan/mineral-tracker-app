"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("mark@test.com");
  const [password, setPassword] = useState<string>("123123123");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      cache: "no-cache",
    });
    const data = await res.json();
    setLoading(false);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    router.push("/dashboard");
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="space-y-3 w-80 px-4">
        <h3 className="text-2xl font-medium">Login</h3>
        <div>
          <p>Email</p>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type your email"
          />
        </div>
        <div>
          <p>Password</p>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type your password"
            type="password"
          />
        </div>
        <div className="pt-2">
          <Button disabled={loading} onClick={handleLogin} className="w-full">
            login
          </Button>
        </div>
      </div>
    </main>
  );
}
