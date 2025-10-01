"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Sun, Moon, Laptop, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Agent User",
  email: "user@example.com",
}

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a potential error
      if (Math.random() < 0.2) {
        throw new Error("Failed to connect to the server. Please try again.")
      }

      toast.success("Profile updated successfully!", {
        description: `Name: ${data.name}, Email: ${data.email}`,
      })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        You can manage verified email addresses in your email
                        settings.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Updating..." : "Update profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the appearance of the app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Theme</h3>
              <RadioGroup
                onValueChange={(value) => setTheme(value)}
                defaultValue={theme}
                className="grid max-w-md grid-cols-1 gap-4 sm:grid-cols-3"
              >
                <Label className="border cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center [&:has([data-state=checked])]:border-primary">
                  <RadioGroupItem value="light" className="sr-only" />
                  <Sun className="w-6 h-6 mb-2" />
                  <span className="font-medium">Light</span>
                </Label>
                <Label className="border cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center [&:has([data-state=checked])]:border-primary">
                  <RadioGroupItem value="dark" className="sr-only" />
                  <Moon className="w-6 h-6 mb-2" />
                  <span className="font-medium">Dark</span>
                </Label>
                <Label className="border cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center [&:has([data-state=checked])]:border-primary">
                  <RadioGroupItem value="system" className="sr-only" />
                  <Laptop className="w-6 h-6 mb-2" />
                  <span className="font-medium">System</span>
                </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}