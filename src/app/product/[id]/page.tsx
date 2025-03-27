import {
  getProductById,
  getRelatedProducts,
  getAllProducts,
} from "@/lib/product-data";
import { notFound } from "next/navigation";
import ProductClient from "./product-client";

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(params.id);

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
