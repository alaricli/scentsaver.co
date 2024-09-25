import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    'Content-Type': 'application/json',
  },
});

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            vendor
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              url
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductsByType(productType) {
  const variables = { productType: `product_type:${productType}` };
  const getAllProductsByTypeQuery = gql`
    query getProductsByType($productType: String!) {
      products(first: 100, query: $productType) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              url
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    return await graphQLClient.request(getAllProductsByTypeQuery, variables);
  } catch (error) {
    throw new Error(`GraphQL query failed: ${error.message}`);
  }
}

export const getProductByHandle = async (handle) => {
  const variables = {
    handle,
  };

  const getProductQuery = gql`
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        vendor
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          altText
          url
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;
  try {
    return await graphQLClient.request(getProductQuery, variables);
  } catch (error) {
    throw new Error(`GraphQL query failed: ${error.message}`);
  }
};

export async function createCart(variantId, quantity) {
  const createCartMutation = gql`
    mutation createCart($variantId: ID!, $quantity: Int!) {
      cartCreate(
        input: { lines: [{ quantity: $quantity, merchandiseId: $variantId }] }
      ) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
            }
          }
        }
      }
    }
  `;

  const variables = {
    variantId,
    quantity,
  };

  try {
    const data = await graphQLClient.request(createCartMutation, variables);
    const cart = data.cartCreate.cart;
    return cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function addItemToCart(cartId, variantId, quantity) {
  const addCartLineMutation = gql`
    mutation addCartLine($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: variantId,
      },
    ],
  };

  try {
    const data = await graphQLClient.request(addCartLineMutation, variables);
    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

export async function updateCartItem(cartId, lineId, quantity) {
  const updateCartLineMutation = gql`
    mutation updateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        id: lineId, // Line item ID
        quantity: quantity, // New quantity
      },
    ],
  };

  try {
    const data = await graphQLClient.request(updateCartLineMutation, variables);
    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

export async function retrieveCart(cartId) {
  const getCartQuery = gql`
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
  };

  try {
    const data = await graphQLClient.request(getCartQuery, variables);
    return data.cart;
  } catch (error) {
    console.error('Error retrieving cart:', error);
    throw error;
  }
}

export async function createCustomer(firstName, lastName, email, password) {
  const customerCreateMutation = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
          email
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
    },
  };

  try {
    const data = await graphQLClient.request(customerCreateMutation, variables);
    if (data.customerCreate.customerUserErrors.length > 0) {
      throw new Error(data.customerCreate.customerUserErrors[0].message);
    }
    return data.customerCreate.customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function updateCustomer(
  customerAccessToken,
  firstName,
  lastName,
  email
) {
  const customerUpdateMutation = gql`
    mutation customerUpdate(
      $customerAccessToken: String!
      $customer: CustomerUpdateInput!
    ) {
      customerUpdate(
        customerAccessToken: $customerAccessToken
        customer: $customer
      ) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
          email
          firstName
          lastName
        }
      }
    }
  `;

  const variables = {
    customerAccessToken,
    customer: {
      email,
      firstName,
      lastName,
    },
  };

  try {
    const data = await graphQLClient.request(customerUpdateMutation, variables);
    if (data.customerUpdate.customerUserErrors.length > 0) {
      throw new Error(data.customerUpdate.customerUserErrors[0].message);
    }
    return data.customerUpdate.customer;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
}

export async function retrieveCustomer(customerAccessToken) {
  const customerQuery = gql`
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        orders(first: 5) {
          edges {
            node {
              orderNumber
              totalPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    customerAccessToken,
  };

  try {
    const data = await graphQLClient.request(customerQuery, variables);
    return data.customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    throw error;
  }
}

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };
  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};
