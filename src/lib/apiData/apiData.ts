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
  const res = await fetch(process.env.BASE_URL + `products/${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Category
// Single products
export async function getCategoryData() {
  const res = await fetch(process.env.BASE_URL + `category`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Single Category
export async function getSingleCatData(id: string) {
  const res = await fetch(process.env.BASE_URL + `category/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

//All products
export async function getAllProductsData() {
  const res = await fetch(process.env.BASE_URL + `allproducts`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
