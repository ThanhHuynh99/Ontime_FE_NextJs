"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/lib/zods/auth"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values:z.infer<typeof LoginSchema>) {
    if (loading) return;
      setLoading(true);
      try {
        const result = await signIn("credentials", values ,{ redirectTo: "/" });
        if (result?.ok) {
          toast({
              className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
              variant: "default",
              title: "Success!",
              description: "You have logged in successfully.",
          });

          redirect("/");
      } else {
          toast({
              className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
              variant: "destructive",
              title: "Login Failed",
              description: result?.error || "There was a problem with your request.",
          });
      }
      } catch (error) {
        console.error("Login error:", error);
      } finally{
        setLoading(false);
      }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid gap-2">
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="/reset"
                    onClick={() => redirect('/reset')}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
