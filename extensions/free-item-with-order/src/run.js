// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const freeItemVariantHandle = "purple-owl-phone-case-gwp";
  const totalAmountForFreeItem = 50;
  const totalAmount = input.cart.cost.totalAmount.amount;
  const lineItems = input.cart.lines;
  const freeItemInCart = lineItems.find(
    (lineItem) => lineItem.merchandise.product.handle == freeItemVariantHandle //&&
    // lineItem.merchandise.id == freeItemVariantId
    // && lineItem.isProductFree?.value == "true"
  );
  const isTotalAmountOk = totalAmount >= totalAmountForFreeItem;

  if (freeItemInCart && isTotalAmountOk) {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          targets: [
            {
              productVariant: {
                id: freeItemInCart.merchandise.id,
              },
            },
          ],
          value: {
            percentage: {
              value: 100,
            },
          },
          message: "FREE ITEM!",
        },
      ],
    };
  } else {
    return EMPTY_DISCOUNT;
  }
}
