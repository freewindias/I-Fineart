"use client";

import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VelocityScroll } from "./magicui/scroll-based-velocity";
import Link from "next/link";
import Button from "./ui/GGButton";

const formSchema = z.object({
  firstname: z.string().min(1).max(1000000).optional(),
  lastname: z.string().min(1).max(1000000).optional(),
  email: z.string().email("Please enter a valid email address"),
  Message: z.string().min(1, "Please enter a message"),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      Message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Show loading toast
      toast.loading("Submitting your message...");

      // Send form data to the API route
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          recipients: ["contact@i-fineart.com", "info@rodias.in"],
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit form");
          }
          return response.json();
        })
        .then(() => {
          toast.dismiss();
          toast.success("Message sent successfully!");

          // Reset form fields after successful submission
          form.reset({
            firstname: "",
            lastname: "",
            email: "",
            Message: "",
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error("Form submission error", error);
          toast.error("Failed to submit the form. Please try again.");
        });
    } catch (error) {
      toast.dismiss();
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="min-h-screen w-full mt-20 pb-10">
      <div className="overflow-hidden">
        <div className="relative text-red-orange-500 flex w-full flex-col items-center justify-center overflow-hidden uppercase py-2">
          <VelocityScroll>Contact Us&nbsp;&nbsp;/&nbsp;</VelocityScroll>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
        </div>
      </div>
      <div className="mx-auto p-4 md:px-9 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <div className="space-y-2">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Let&apos;s unlock together the next level of possibilities!
              </h3>
              <p className="text-4xl md:text-5xl font-bold mt-2">Reach out.</p>
            </div>

            <div className="mt-16">
              <h4 className="text-lg text-gray-400 uppercase mb-4">
                Social Media
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                  <Button variant="text">
                    <Link href="#">INSTAGRAM</Link>
                  </Button>
                  <span>—</span>
                  <Button variant="text">
                    <Link href="#">TWITTER</Link>
                  </Button>
                  <span>—</span>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                  <Button variant="text">
                    <Link href="#">YOUTUBE</Link>
                  </Button>
                  <span>—</span>
                  <Button variant="text">
                    <Link href="#">PINTEREST</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-16">
              <div>
                <h4 className="text-lg text-gray-400 uppercase mb-4">
                  Get in touch
                </h4>
                <Button variant="text">
                  <Link href="mailto:contact@i-fineart.com">
                    CONTACT@I-FINEART.COM
                  </Link>
                </Button>
              </div>
              <div>
                <h4 className="text-lg text-gray-400 uppercase mb-4">
                  Location
                </h4>
                <p className="mb-4">
                  <Button variant="text">MUMBAI - INDIA</Button>
                </p>
                <div className="w-full h-[270px] rounded-lg overflow-hidden border border-gray-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710851291657!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: "invert(90%) hue-rotate(180deg)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mumbai Map"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="my-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            type="text"
                            className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF5C35]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF5C35]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            type="email"
                            className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF5C35]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="Message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Message"
                            rows={5}
                            className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[#FF5C35]" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between items-center pt-8 mt-4">
                  <Button variant="text" type="submit">
                    <div className="group flex items-center text-5xl font-bold">
                      SUBMIT
                      <span className="ml-4 transform transition-transform group-hover:translate-x-2">
                        <ArrowRight size={40} />
                      </span>
                    </div>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
