export function parseFilters(filters: any) {
  const vendors = Array.from(
    new Set(filters.edges.map((edge: any) => edge.node.vendor))
  );
  const productTypes = Array.from(
    new Set(filters.edges.map((edge: any) => edge.node.productType))
  );

  return { vendors, productTypes };
}
