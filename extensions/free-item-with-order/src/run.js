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
  const freeItemVariantId = "gid://shopify/ProductVariant/48040974025013";
  const totalAmountForFreeItem = 50;
  const totalAmount = input.cart.cost.totalAmount.amount;
  const lineItems = input.cart.lines;
  const isFreeItemInCart = lineItems.find(
    (lineItem) => lineItem.merchandise.id == freeItemVariantId
  );
  const isTotalAmountOk = totalAmount >= totalAmountForFreeItem;

  if (isFreeItemInCart && isTotalAmountOk) {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          targets: [
            {
              productVariant: {
                id: freeItemVariantId,
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
