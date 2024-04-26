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
import { useRegisterMutation } from "@/redux/Apis/auth.api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RootState, Store } from "@/redux/Store";
import { setUser } from "@/redux/userReducer/reducer";
import { useSelector } from "react-redux";
const Page = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [register, { data, isLoading, isSuccess }] = useRegisterMutation();
  useEffect(() => {
    if (user) router.push("/");
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isLoading, isSuccess]);
  const handelFromSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const surname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    toast.promise(
      register({ name: name + " " + surname, email, password }).then(
        (res: any) => {
          if (res?.error) {
            throw new Error(res?.error.data.message as string);
          }
          res?.data?.user &&
            Store.dispatch(
              setUser({ user: res.data.user, token: res.data.token })
            );
        }
      ),
      {
        loading: "Loading...",
        success: "Register Successfully",
        error: (err) => `${err}`,
      }
    );
  };
  return (
    <div className="flex w-full h-screen justify-center items-center">
      {!user && (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handelFromSubmit} className="grid">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Max" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required />
                  </div>
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Button
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Log in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
