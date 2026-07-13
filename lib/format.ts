export function money(value: number): string {
  if (!value || value <= 0) return "Custom quote";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function plainText(html: string): string {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function dateLabel(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export function stars(rating: number): string {
  const filled = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}
