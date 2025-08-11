

import React,{ Suspense } from "react";
import ProductsContent from "./ProductsContent";



export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}