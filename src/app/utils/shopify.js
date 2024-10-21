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

export async function getProducts({
  sortType = 'CREATED_AT',
  reverse = true,
  first = 40,
  cursor = null,
  filter = {},
}) {
  const { brand, category, minPrice, maxPrice, sizes } = filter;

  let queryFilter = [];
  if (brand) queryFilter.push(`vendor:${brand}`);
  if (category) queryFilter.push(`product_type:${category}`);
  if (minPrice && maxPrice)
    queryFilter.push(
      `variants.price:>${minPrice} AND variants.price:<${maxPrice}`
    );
  if (sizes && sizes.length > 0)
    queryFilter.push(`variant_option:${sizes.join(' OR ')}`);

  const queryString = queryFilter.join(' AND ');

  const getProductsQuery = gql`
    query getProducts(
      $sortKey: ProductSortKeys
      $reverse: Boolean
      $first: Int
      $after: String
      $query: String
    ) {
      products(
        first: $first
        sortKey: $sortKey
        reverse: $reverse
        after: $after
        query: $query
      ) {
        edges {
          node {
            id
            title
            handle
            vendor
            createdAt
            description
            productType
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
            variants(first: 20) {
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

  const variables = {
    first,
    after: cursor, // Use cursor for pagination (null on first request)
    sortKey: sortType, // Sort key (e.g., 'CREATED_AT', 'TITLE', 'PRICE')
    reverse, // Sorting order (e.g., true for descending, false for ascending)
    query: queryString || null,
  };

  try {
    const result = await graphQLClient.request(getProductsQuery, variables);
    return result.products;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProductsByType(productType) {
  const variables = {
    productType: `product_type:${productType} AND available:true`,
  };
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
        productType
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
              availableForSale
              quantityAvailable
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

export async function getFilters() {
  const getFiltersQuery = gql`
    query getFilters {
      products(first: 100) {
        edges {
          node {
            vendor
            productType
            priceRange {
              minVariantPrice {
                amount
              }
              maxVariantPrice {
                amount
              }
            }
            variants(first: 100) {
              edges {
                node {
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
    const result = await graphQLClient.request(getFiltersQuery);
    return result.products;
  } catch (error) {
    throw new Error(`Failed to fetch filters: ${error.message}`);
  }
}

export async function getVendors(category) {
  const getVendorsQuery = gql`
    query getFilters($category: String!) {
      products(first: 100, query: $category) {
        edges {
          node {
            vendor
            productType
          }
        }
      }
    }
  `;

  const variables = {
    category: category ? `product_type:${category}` : '', // Filter by category
  };

  try {
    const result = await graphQLClient.request(getVendorsQuery, variables);
    const vendors = result.products.edges.map((edge) => edge.node.vendor);
    return [...new Set(vendors)]; // Remove duplicate vendors
  } catch (error) {
    throw new Error(`Failed to fetch vendors: ${error.message}`);
  }
}

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
                    product {
                      id
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const variables = {
    variantId,
    quantity: parseInt(quantity, 10),
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
                    product {
                      id
                      title
                      featuredImage {
                        url
                        altText
                      }
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
        quantity: parseInt(quantity, 10),
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
                    priceV2 {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
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

export async function deleteCartItem(cartId, lineId) {
  const deleteCartLineMutation = gql`
    mutation deleteCartLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
              currencyCode
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lineIds: [lineId], // Pass the line item ID to remove
  };

  try {
    const data = await graphQLClient.request(deleteCartLineMutation, variables);
    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Error deleting item from cart:', error);
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
                  product {
                    id
                    title
                    featuredImage {
                      url
                      altText
                    }
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
        orders(first: 10) {
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
        defaultAddress {
          id
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        addresses(first: 5) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              country
              zip
              phone
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

export async function customerLogin(email, password) {
  const customerAccessTokenCreate = gql`
    mutation customerAccessTokenCreate(
      $input: CustomerAccessTokenCreateInput!
    ) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  try {
    const data = await graphQLClient.request(
      customerAccessTokenCreate,
      variables
    );

    if (data.customerAccessTokenCreate.customerUserErrors.length) {
      throw new Error(
        data.customerAccessTokenCreate.customerUserErrors[0].message
      );
    }

    return data.customerAccessTokenCreate.customerAccessToken;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

export async function customerLogout(accessToken) {
  const customerAccessTokenDelete = gql`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: accessToken,
  };

  try {
    const data = await graphQLClient.request(
      customerAccessTokenDelete,
      variables
    );
    if (data.customerAccessTokenDelete.userErrors.length) {
      throw new Error(data.customerAccessTokenDelete.userErrors[0].message);
    }
    return true;
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
}

export const createCustomerAddress = async (customerAccessToken, address) => {
  const mutation = gql`
    mutation customerAddressCreate(
      $customerAccessToken: String!
      $address: MailingAddressInput!
    ) {
      customerAddressCreate(
        customerAccessToken: $customerAccessToken
        address: $address
      ) {
        customerAddress {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken,
    address,
  };

  try {
    const response = await graphQLClient.request(mutation, variables);
    const { customerAddressCreate } = response;
    if (customerAddressCreate.customerUserErrors.length > 0) {
      throw new Error(customerAddressCreate.customerUserErrors[0].message);
    }
    return customerAddressCreate.customerAddress.id;
  } catch (error) {
    console.error('Failed to create address:', error);
    throw error;
  }
};

export const setCustomerDefaultAddress = async (
  customerAccessToken,
  addressId
) => {
  const mutation = gql`
    mutation customerDefaultAddressUpdate(
      $customerAccessToken: String!
      $addressId: ID!
    ) {
      customerDefaultAddressUpdate(
        customerAccessToken: $customerAccessToken
        addressId: $addressId
      ) {
        customer {
          defaultAddress {
            id
          }
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken,
    addressId,
  };

  try {
    const response = await graphQLClient.request(mutation, variables);
    const { customerDefaultAddressUpdate } = response;
    if (customerDefaultAddressUpdate.customerUserErrors.length > 0) {
      throw new Error(
        customerDefaultAddressUpdate.customerUserErrors[0].message
      );
    }
    return customerDefaultAddressUpdate.customer.defaultAddress.id;
  } catch (error) {
    console.error('Failed to set default address:', error);
    throw error;
  }
};

export const deleteCustomerAddress = async (customerAccessToken, addressId) => {
  const mutation = gql`
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(
        customerAccessToken: $customerAccessToken
        id: $id
      ) {
        deletedCustomerAddressId
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken,
    id: addressId,
  };

  try {
    const response = await graphQLClient.request(mutation, variables);
    const { customerAddressDelete } = response;

    if (customerAddressDelete.customerUserErrors.length > 0) {
      throw new Error(customerAddressDelete.customerUserErrors[0].message);
    }

    return customerAddressDelete.deletedCustomerAddressId;
  } catch (error) {
    console.error('Failed to delete address:', error);
    throw error;
  }
};

export const createCheckout = async (lineItems) => {
  const checkoutCreate = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
          field
          code
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: lineItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    },
  };

  try {
    const data = await graphQLClient.request(checkoutCreate, variables);

    if (data.checkoutCreate.checkoutUserErrors.length) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return data.checkoutCreate.checkout.webUrl; // The Shopify checkout URL
  } catch (error) {
    console.error('Checkout creation error:', error.message);
    throw error;
  }
};

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
