export function formatCurrency(amount: number): string {
  const rounded = Math.round(amount);
  return `₹${new Intl.NumberFormat('en-IN').format(rounded)}`;
}

export function formatCompactCurrency(amount: number): string {
  return formatCurrency(amount);
}
