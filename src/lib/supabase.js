import { createClient } from "@supabase/supabase-js";

// ─── Replace these with your real Supabase project values ───────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// ────────────────────────────────────────────────────────────────────────────

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export const signOut = () => supabase.auth.signOut();

export const getSession = () => supabase.auth.getSession();

export const onAuthChange = (cb) => supabase.auth.onAuthStateChange(cb);

// ─── Products ────────────────────────────────────────────────────────────────
// Expected table: products(id, name, category, price, price_val, tag, img, description, sizes, details, created_at)
export const fetchProducts = () =>
  supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

export const insertProduct = (data) =>
  supabase.from("products").insert([data]).select().single();

// export const updateProduct = (id, data) =>
//   supabase.from("products").update(data).eq("id", id).select().single();

export const updateProduct = (id, data) => {
  const { id: _omit, ...safeData } = data;
  return supabase
    .from("products")
    .update(safeData)
    .eq("id", id)
    .select()
    .single();
};

export const deleteProduct = (id) =>
  supabase.from("products").delete().eq("id", id);

// ─── Orders ──────────────────────────────────────────────────────────────────
// Expected table: orders(id, customer_name, customer_email, product_name, size, amount, status, created_at)
// status: 'pending' | 'fulfilled' | 'cancelled'
export const fetchOrders = () =>
  supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        product_name,
        image,
        size,
        quantity,
        unit_price,
        subtotal
      )
    `,
    )
    .order("created_at", { ascending: false });

export const updateOrderStatus = (id, status) =>
  supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        product_name,
        image,
        size,
        quantity,
        unit_price,
        subtotal
      )
    `,
    )
    .single();

// ─── Dashboard stats ─────────────────────────────────────────────────────────
export const fetchStats = async () => {
  const [products, orders] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }),
    supabase.from("orders").select("id, amount, status", { count: "exact" }),
  ]);

  const total_orders = orders.count ?? 0;
  const total_revenue = (orders.data ?? []).reduce(
    (sum, o) => sum + (o.amount ?? 0),
    0,
  );
  const pending = (orders.data ?? []).filter(
    (o) => o.status === "pending",
  ).length;
  const total_products = products.count ?? 0;

  return { total_products, total_orders, total_revenue, pending };
};

// image upload function for products

export const uploadProductImage = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(filePath, file);

  if (error) return { error };

  const { data } = supabase.storage.from("products").getPublicUrl(filePath);

  return {
    url: data.publicUrl,
    error: null,
  };
};

export const fetchProductById = (id) =>
  supabase.from("products").select("*").eq("id", id).single();

// productdetails
export const fetchRelatedProducts = (category, id) =>
  supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", id)
    .limit(4);

// order
supabase.from("orders").select(`
    *,
    order_items (
      id,
      product_name,
      image,
      quantity,
      size,
      unit_price,
      subtotal
    )
  `);

// ─────────────────────────────────────────────────────────────
// Create Order
// ─────────────────────────────────────────────────────────────

export const createOrder = (order) =>
  supabase.from("orders").insert([order]).select().single();

// ─────────────────────────────────────────────────────────────
// Create Order Items
// ─────────────────────────────────────────────────────────────

export const createOrderItems = (items) =>
  supabase.from("order_items").insert(items).select();

// ─────────────────────────────────────────────────────────────
// Fetch Single Order
// ─────────────────────────────────────────────────────────────

export const fetchOrder = (id) =>
  supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        product_name,
        image,
        quantity,
        size,
        unit_price,
        subtotal
      )
    `,
    )
    .eq("id", id)
    .single();

// contact

export const sendContactMessage = ({ name, email, message }) =>
  supabase.from("contact_messages").insert({ name, email, message });

export const fetchContactMessages = () =>
  supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

export const markMessageRead = (id, is_read) =>
  supabase
    .from("contact_messages")
    .update({ is_read })
    .eq("id", id)
    .select()
    .single();

export const deleteContactMessage = (id) =>
  supabase.from("contact_messages").delete().eq("id", id);

// ─── Shop Menu ────────────────────────────────────────────────────────────────
export const fetchShopMenu = () =>
  supabase
    .from("shop_menu")
    .select("*")
    .order("sort_order", { ascending: true });

export const insertShopMenuItem = (data) =>
  supabase.from("shop_menu").insert(data).select().single();

export const updateShopMenuItem = (id, data) => {
  const { id: _omit, ...safeData } = data;
  return supabase
    .from("shop_menu")
    .update(safeData)
    .eq("id", id)
    .select()
    .single();
};

export const deleteShopMenuItem = (id) =>
  supabase.from("shop_menu").delete().eq("id", id);

// Converts flat shop_menu rows into { id, name, subsections: [{id, name}] } shape
export const buildShopMenuTree = (rows) => {
  const top = rows
    .filter((r) => !r.parent_id)
    .sort((a, b) => a.sort_order - b.sort_order);

  return top.map((cat) => ({
    id: cat.id,
    name: cat.name,
    subsections: rows
      .filter((r) => r.parent_id === cat.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({ id: s.id, name: s.name })),
  }));
};
