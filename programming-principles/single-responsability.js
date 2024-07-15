/**
 * by Nailton R.
 * 
 * Single Responsability Principle
 */

const [price, percentage] = [50, 25];

/* The calculateDiscount function has multiple 
  resposability and this can cause confusion later */
function calculateDiscount({ value, percentage }) {
  const discount = Math.round((value * percentage) / 100);

  const newPrice = value - discount;

  return {
    price: value,
    discount,
    newPrice,
  }
}

const result = calculateDiscount({ value: price, percentage });

console.log(result);
// expected: { price: 50, discount: 13, newPrice: 37 }

/* Applying the Single Responsability Principle
  we have something like this */

function getDiscount({ value, percentage }) {
  return Math.round((value * percentage) / 100);
}

function getDiscountPrice({ value, discount }) {
  return value - discount;
}

const discount = getDiscount({ value: price, percentage });
const newPrice = getDiscountPrice({ value: price, discount });

console.log({ price, discount, newPrice });
// expected: { price: 50, discount: 13, newPrice: 37 }
