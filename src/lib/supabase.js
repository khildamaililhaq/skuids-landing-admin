import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Auth helpers
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getCurrentUser = () => supabase.auth.getUser();

export const subscribeToAuthChanges = (callback) => {
  const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
  return () => subscription.subscription.unsubscribe();
};

// Default content structure (kept in sync with previous Firebase version)
const getDefaultContent = () => ({
  logo: '/logo.svg',
  hero: {
    title: 'Selamat Datang',
    subtitle: 'Transformasikan bisnis Anda dengan solusi inovatif kami',
    buttonText: 'Mulai',
    buttonUrl: '/#products',
    secondButtonText: 'Cek Distributor',
    secondButtonUrl: '/locations',
    backgroundImage: '/hero-bg.jpg',
    backgroundVideo: '',
    heroImages: [
      '/campaigns/slider2.png',
      '/campaigns/slider1.jpeg',
      '/window.svg'
    ],
    campaigns: [
      { id: 1, image: '/campaigns/slider2.png', title: 'Welcome Campaign', subtitle: 'Transform your business with our innovative solutions', buttonText: 'Learn More', buttonUrl: '' },
    ],
  },
  features: {
    title: 'Our Features',
    description: 'Discover what makes us special',
    items: [
      { id: 1, title: 'Fast Performance', description: 'Lightning-fast performance that scales with your needs', icon: 'Speed' },
    ],
  },
  products: [
    { id: 1, name: 'Product 1', description: 'High-quality product with excellent features', image: '/products/WhatsApp Image 2025-08-18 at 16.45.48.jpeg', price: '$99.99' },
  ],
  about: {
    title: 'About Our Company',
    description: 'We are a leading technology company dedicated to providing innovative solutions.',
    image: '/about-image.jpg',
  },
  contact: {
    title: 'Get in Touch',
    description: 'Ready to get started? Contact us today!',
    email: 'hello@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    facebook: '',
    instagram: '',
    whatsapp: '',
    tiktok: '',
    youtube: '',
  },
});

// Content CRUD via Supabase
// Table: content (id: text primary key, data: jsonb)
export const getContent = async () => {
  try {
    const { data, error } = await supabase.from('content').select('data').eq('id', 1).single();
    if (error && error.code !== 'PGRST116') {
      return { success: false, error: error.message };
    }
    if (!data || !data.data) {
      return { success: true, data: getDefaultContent() };
    }
    return { success: true, data: data.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateContent = async (content) => {
  try {
    const { error } = await supabase.from('content').upsert({ id: 1, data: content }, { onConflict: 'id' });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Storage helpers
// Bucket: assets (public)
export const uploadFileToStorage = async (file, folder = 'uploads') => {
  try {
    if (!file) return { success: false, error: 'No file provided' };
    const fileExtension = file.name?.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const safeName = (file.name || `file.${fileExtension}`).replace(/[^a-zA-Z0-9_.-]/g, '_');
    const path = `${folder}/${timestamp}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('assets').upload(path, file, { upsert: true, cacheControl: '3600' });
    if (uploadError) return { success: false, error: uploadError.message };
    const { data } = supabase.storage.from('assets').getPublicUrl(path);
    return { success: true, url: data.publicUrl };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Legacy alias for backward compatibility
export const uploadImageToStorage = uploadFileToStorage;

// Products CRUD operations
export const getProducts = async (from = 0, to = 19) => {
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        product_categories (
          id,
          name,
          description
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [], count: count || 0 };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const createProduct = async (product) => {
  try {
    const { data, error } = await supabase.from('products').insert(product).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateProduct = async (id, updates) => {
  try {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Categories CRUD operations
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getAllCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getCategoryById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const createCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert(category)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateCategory = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteCategory = async (id) => {
  try {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId, from = 0, to = 19) => {
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select(`
        *,
        product_categories (
          id,
          name,
          description
        )
      `, { count: 'exact' })
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [], count: count || 0 };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get products with category information
export const getProductsWithCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories (
          id,
          name,
          description
        )
      `)
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Locations CRUD operations
export const getLocations = async (from = 0, to = 19) => {
  try {
    const { data, error, count } = await supabase
      .from('locations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [], count: count || 0 };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getLocationById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const createLocation = async (location) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .insert(location)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateLocation = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteLocation = async (id) => {
  try {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Visit count operations
export const getVisitCount = async (pageType = 'landing') => {
 try {
   const { data, error } = await supabase
     .from('visit_counts')
     .select('visit_count')
     .eq('page_type', pageType)
     .single();
   if (error) return { success: false, error: error.message };
   return { success: true, count: data?.visit_count || 0 };
 } catch (err) {
   return { success: false, error: err.message };
 }
};

export const incrementVisitCount = async (pageType = 'landing') => {
  try {
    const { data, error } = await supabase.rpc('increment_visit_count', { page_type_param: pageType });
    if (error) return { success: false, error: error.message };
    return { success: true, count: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Partners CRUD operations
export const getPartners = async () => {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getPartnerById = async (id) => {
  try {
    const { data, error } = await supabase.from('partners').select('*').eq('id', id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const createPartner = async (partner) => {
  try {
    const { data, error } = await supabase.from('partners').insert(partner).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updatePartner = async (id, updates) => {
  try {
    const { data, error } = await supabase.from('partners').update(updates).eq('id', id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deletePartner = async (id) => {
  try {
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default supabase;


