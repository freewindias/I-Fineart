import { redirect } from "next/navigation"

export default function ProductIndexPage() {
  // Redirect to store page if someone visits /product directly
  redirect("/store")
}

