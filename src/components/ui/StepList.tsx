interface Step {
  label: string;
}

const colsClass: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/** Numbered journey/process steps, stacked on mobile and laid out as a
 * connected horizontal flow on larger screens. */
export function StepList({ steps, columns = 5 }: { steps: Step[]; columns?: 3 | 4 | 5 }) {
  return (
    <ol className={`step-flow grid grid-cols-1 gap-5 ${colsClass[columns]}`}>
      {steps.map((step, i) => (
        <li key={step.label} className="step-connector flex items-start gap-4">
          <span className="border-border-strong text-brand flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full border bg-paper text-sm font-semibold">
            {i + 1}
          </span>
          <span className="text-ink pt-2 text-[16.5px] font-semibold leading-snug">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}
