/**
 * Format a number as Indian Rupees with proper Indian number grouping.
 * e.g. 100000 → ₹1,00,000
 */
export function formatPrice(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
