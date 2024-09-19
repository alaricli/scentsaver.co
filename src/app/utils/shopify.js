import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.SHOPIFY_STORE_URL;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

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

export const getProductByID = async (id) => {
  const variables = {
    id,
  };
  const getProductQuery = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
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

export async function addToCart(itemId, quantity) {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: itemId,
        },
      ],
    },
  };
  try {
    return await graphQLClient.request(createCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };
  try {
    return await graphQLClient.request(updateCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createCart() {
  const createCartMutation = gql`
    mutation {
      cartCreate {
        cart {
          id
          createdAt
          updatedAt
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
          estimatedCost {
            totalAmount {
              amount
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(createCartMutation);
    return data.cartCreate.cart;
  } catch (error) {
    console.error('Error creating cart:', error.message);
    return undefined;
  }
}

export async function fetchOrCreateCart(cartId) {
  if (cartId) {
    const existingCart = await retrieveCart(cartId);
    if (existingCart) {
      return existingCart;
    }
  }

  const newCart = await createCart();
  return newCart;
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt

        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
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
    const data = await graphQLClient.request(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
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
