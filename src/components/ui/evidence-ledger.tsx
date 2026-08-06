import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EvidenceItem {
  label: string;
  content: ReactNode;
}

interface EvidenceLedgerProps {
  items: EvidenceItem[];
  className?: string;
}

export function EvidenceLedger({ items, className }: EvidenceLedgerProps) {
  return (
    <dl className={cn("evidence-ledger", className)}>
      {items.map((item) => (
        <div key={item.label} className="evidence-ledger__item">
          <dt>{item.label}</dt>
          <dd>{item.content}</dd>
        </div>
      ))}
    </dl>
  );
}
