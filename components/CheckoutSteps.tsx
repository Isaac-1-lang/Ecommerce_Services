export type CheckoutStep = "cart" | "address" | "payment" | "review" | "complete";

export default function CheckoutSteps({ step }: { step: CheckoutStep }) {
  const steps: CheckoutStep[] = ["cart", "address", "payment", "review", "complete"];
  const currentIndex = steps.indexOf(step);
  return (
    <ol className="flex items-center justify-center gap-4 text-sm mb-8">
      {steps.map((s, idx) => (
        <li key={s} className={`flex items-center gap-2 ${idx <= currentIndex ? "text-primary" : "text-neutral-400"}`}>
          <span className={`rounded-full border px-3 py-1 capitalize text-xs font-medium transition-all ${
            idx <= currentIndex 
              ? "border-primary bg-primary text-white" 
              : "border-neutral-300 bg-white text-neutral-500"
          }`}>
            {s}
          </span>
          {idx < steps.length - 1 && <span className="text-neutral-300">→</span>}
        </li>
      ))}
    </ol>
  );
}
