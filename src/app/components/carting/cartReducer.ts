import type { Cart, CartItem, Product, ProductVariant } from '@/types/types';

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
  | {
      type: 'UPDATE_ITEM';
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: 'ADD_ITEM';
      payload: { variant: ProductVariant; product: Product };
    };

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType == 'delete') return null;

  const newQuantity =
    updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const currencyCode = variant?.price?.currencyCode ?? 'CAD';
  const priceAmount = variant?.price?.amount ?? '0';
  const totalAmount = calculateItemCost(quantity, priceAmount);

  return {
    id: existingItem?.id ?? 'temporary_id',
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
        priceRange: product.priceRange ?? { minVariantPrice: { amount: '0' } }, // Optional or fetched data
        variants: product.variants ?? [], // Optional or fetched data
        vendor: product.vendor ?? 'Unknown Vendor', // Optional or default value
      },
    },
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode },
    },
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: '',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'USD' },
      totalAmount: { amount: '0', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0', currencyCode: 'USD' },
    },
  };
}

export function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case 'UPDATE_ITEM': {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: '0' },
          },
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    case 'ADD_ITEM': {
      const { variant, product } = action.payload;
      const existingItem = Array.isArray(currentCart.lines)
        ? currentCart.lines.find((item) => item.merchandise.id === variant.id)
        : undefined;
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product
      );

      const updatedLines = Array.isArray(currentCart.lines)
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    default:
      return currentCart;
  }
}
