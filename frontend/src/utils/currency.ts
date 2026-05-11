/**
 * Format price in Indian Rupees
 * @param price - Price as number or string
 * @returns Formatted price string with ₹ symbol
 */
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return '₹0.00';
  }
  
  return `₹${numPrice.toFixed(2)}`;
};

/**
 * Format price without symbol
 * @param price - Price as number or string
 * @returns Formatted price string without symbol
 */
export const formatPriceValue = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return '0.00';
  }
  
  return numPrice.toFixed(2);
};
