export async function getUserData() {
  const res = await fetch(process.env.BASE_URL + "user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getSellerData() {
  const res = await fetch(process.env.BASE_URL + "seller");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getProductsData() {
  const res = await fetch(process.env.BASE_URL + "products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Single products
export async function getSingleData(productId: string) {
  const res = await fetch(process.env.BASE_URL + `products/${productId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
