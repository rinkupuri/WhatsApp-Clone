"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/Apis/auth.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState, Store } from "@/redux/Store";
import { setUser } from "@/redux/userReducer/reducer";
import { useSelector } from "react-redux";
const Page = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const router = useRouter();
  const [loginUser, { isLoading, isSuccess }] = useLoginMutation();
  useEffect(() => {
    if (user) router.push("/");
  }, [user]);
  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isLoading, isSuccess]);
  const handelFormSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await toast.promise(
      loginUser({ email, password }).then((res: any) => {
        if (res?.error) {
          throw new Error(res?.error.data.message as string);
        }
        res?.data?.user &&
          Store.dispatch(
            setUser({ user: res.data.user, token: res.data.token })
          );
      }),
      {
        loading: "Loading...",
        success: "Login Successfully",
        error: (err) => `${err}`,
      }
    );
  };
  return (
    <div className="flex w-full h-screen justify-center items-center">
      {!user && (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handelFormSubmit} className="grid">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>

            <div className="flex mt-4 w-full gap-2">
              <Button variant="outline" className="flex-[1] border-[#00000060]">
                Google
              </Button>
              <Button variant="outline" className="flex-[1] border-[#00000060]">
                Github
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
