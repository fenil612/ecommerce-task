import { openDB } from "idb";

// Open IndexedDB
const dbPromise = openDB("productsDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("products")) {
      db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
    }
  },
});

// Save product to IndexedDB
export const saveProductToIndexedDB = async (product) => {
  const db = await dbPromise;
  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");

  // Add product and get the auto-generated ID
  const id = await store.add({ ...product });

  await tx.done;
  return { ...product, id }; // Return the product with the assigned ID
};

// Get all products from IndexedDB
export const getProductsFromIndexedDB = async () => {
  const db = await dbPromise;
  return await db.getAll("products");
};

// Delete a product from IndexedDB
export const deleteProductFromIndexedDB = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction("products", "readwrite");
  await tx.objectStore("products").delete(id);
  await tx.done;
};
