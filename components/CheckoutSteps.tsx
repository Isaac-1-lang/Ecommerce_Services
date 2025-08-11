export type CheckoutStep = "cart" | "address" | "payment" | "review" | "complete";

export default function CheckoutSteps({ step }: { step: CheckoutStep }) {
  const steps: CheckoutStep[] = ["cart", "address", "payment", "review", "complete"];
  const currentIndex = steps.indexOf(step);
  return (
    <ol className="flex items-center justify-center gap-4 text-sm">
      {steps.map((s, idx) => (
        <li key={s} className={`flex items-center gap-2 ${idx <= currentIndex ? "text-primary" : "text-green-500"}`}>
          <span className="rounded-full border px-2 py-0.5 capitalize">{s}</span>
          {idx < steps.length - 1 && <span className="opacity-40">→</span>}
        </li>
      ))}
    </ol>
  );
}
