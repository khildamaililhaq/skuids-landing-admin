import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Determine the correct redirect URL based on environment
const getRedirectUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:3000';
  
  const isProduction = window.location.hostname === 'skuids.live' || window.location.hostname === 'www.skuids.live';
  return isProduction ? 'https://skuids.live/auth/callback' : 'http://localhost:3000/auth/callback';
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo: getRedirectUrl(),
  },
});

// Auth helpers
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    
    // Check user role - must be admin to access admin area
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const userMetadata = user.user_metadata || {};
      const role = userMetadata.role;
      
      if (role !== 'admin') {
        // Not an admin - sign them out
        await supabase.auth.signOut();
        return { success: false, error: 'Only admins can access the admin panel. Please use the agent login page.' };
      }
    }
    
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
    title: 'Join the Future of Livestream Entertainment',
    subtitle: 'Become a host or agent on top livestreaming platforms. Earn money through gifts, missions, and commissions. Get support from our marketing tools and experienced team.',
    buttonText: 'Start Earning Today',
    buttonUrl: '/#products',
    secondButtonText: 'Learn More',
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
  howItWorks: {
    title: 'How Skuids Works',
    description: 'Three simple ways to earn with Skuids',
    steps: [
      {
        number: '1',
        title: 'Register as Host or Agent',
        description: 'Choose your path: become a host and earn from live streaming, or become an agent and recruit hosts while earning commissions.',
      },
      {
        number: '2',
        title: 'Join Your Platform',
        description: 'Pick from multiple platforms like Chamet or Poppo. Each platform offers different earning opportunities and mission rewards.',
      },
      {
        number: '3',
        title: 'Start Earning',
        description: 'Hosts earn from viewer gifts and completing missions. Agents earn commissions from their recruited hosts and access to marketing tools.',
      },
    ],
  },
  features: {
    title: 'Our Features',
    description: 'Discover what makes us special',
    items: [
      { id: 1, title: 'Fast Performance', description: 'Lightning-fast performance that scales with your needs', icon: 'Speed' },
    ],
  },
  agentBenefits: [
    {
      id: 1,
      title: 'Marketing Tools Suite',
      description: 'Access professional marketing tools to easily recruit and manage hosts. Track performance, manage payouts, and scale your team.',
      icon: '📊',
    },
    {
      id: 2,
      title: 'Competitive Commissions',
      description: 'Earn generous commissions from your recruited hosts\' earnings. Commission rates vary by platform and performance.',
      icon: '💰',
    },
    {
      id: 3,
      title: 'Expert Support',
      description: 'Get dedicated support from our experienced team. Training, strategy advice, and technical assistance available 24/7.',
      icon: '🤝',
    },
    {
      id: 4,
      title: 'Mission Bonuses',
      description: 'Earn additional income through special missions and bonuses. Incentives reset regularly with new opportunities.',
      icon: '🎯',
    },
  ],
  hostBenefits: [
    {
      id: 1,
      title: 'Earn from Gifts',
      description: 'Viewers send you virtual gifts during live streams. Convert gifts to real money at competitive rates.',
      icon: '🎁',
    },
    {
      id: 2,
      title: 'Daily Missions',
      description: 'Complete daily missions to earn bonus rewards. Missions vary by platform and offer steady additional income.',
      icon: '📋',
    },
    {
      id: 3,
      title: 'Multi-Platform Access',
      description: 'Stream on multiple platforms simultaneously. Expand your audience and multiply your earning potential.',
      icon: '🌐',
    },
    {
      id: 4,
      title: 'Professional Guidance',
      description: 'Get tips and strategies from experienced hosts. Learn how to maximize earnings and build a loyal audience.',
      icon: '📚',
    },
  ],
  platforms: [
    {
      id: 1,
      name: 'Chamet',
      description: 'Leading livestream platform in Southeast Asia with millions of daily active users. Earn from viewer gifts and exclusive missions.',
      features: ['High gift conversion rates', 'Daily missions with bonus rewards', 'Growing creator community', 'Professional support'],
      image: '/platforms/chamet.jpg',
    },
    {
      id: 2,
      name: 'Poppo',
      description: 'Global livestreaming platform connecting creators with audiences worldwide. Multiple earning streams and flexible schedule.',
      features: ['International audience', 'Diverse mission opportunities', 'Flexible streaming hours', 'Community events'],
      image: '/platforms/poppo.jpg',
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Sarah M.',
      role: 'Host',
      image: '/testimonials/host1.jpg',
      quote: 'I started as a host 6 months ago and I\'m now making more than my previous job. Skuids team was incredibly supportive throughout my journey.',
      earnings: '$5,000+/month',
    },
    {
      id: 2,
      name: 'Ravi K.',
      role: 'Agent',
      image: '/testimonials/agent1.jpg',
      quote: 'As an agent, I\'ve built a team of 25 hosts. The marketing tools Skuids provides made recruitment easy and efficient.',
      earnings: '$8,500+/month',
    },
    {
      id: 3,
      name: 'Jessica L.',
      role: 'Host',
      image: '/testimonials/host2.jpg',
      quote: 'The mission rewards are consistent and fair. I love the flexibility to stream when I want and earn on my own terms.',
      earnings: '$3,200+/month',
    },
  ],
  about: {
    title: 'About Skuids',
    description: 'Skuids is a leading livestream recruitment and talent platform connecting talented hosts and agents with top-tier livestreaming platforms globally.',
    image: '/about-image.jpg',
  },
  contact: {
    title: 'Get In Touch',
    description: 'Have questions? Want to join Skuids? Our team is here to help you get started on your path to earning.',
    email: 'hello@skuids.live',
    phone: '+1 (555) 123-4567',
    address: '123 Digital Street, Tech City, USA',
    facebook: 'https://facebook.com/skuids',
    instagram: 'https://instagram.com/skuids',
    whatsapp: '15551234567',
    tiktok: 'https://tiktok.com/@skuids',
    youtube: 'https://youtube.com/skuids',
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

// Agents CRUD operations
export const getAgents = async () => {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getAgentById = async (id) => {
  try {
    const { data, error } = await supabase.from('agents').select('*').eq('id', id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const createAgent = async (agent) => {
  try {
    const { data, error } = await supabase.from('agents').insert(agent).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateAgent = async (id, updates) => {
  try {
    const { data, error } = await supabase.from('agents').update(updates).eq('id', id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteAgent = async (id) => {
  try {
    const { error } = await supabase.from('agents').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Agent authentication
export const registerAgent = async (agentData) => {
  try {
    // Step 1: Create auth user via backend API
    const signupResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentData),
    });

    const signupResult = await signupResponse.json();

    console.log('Registration response:', signupResult);

    if (!signupResponse.ok || !signupResult.success) {
      const errorMsg = signupResult.error || signupResult.message || 'Signup failed';
      console.error('Registration failed:', errorMsg);
      return { success: false, error: errorMsg };
    }

    // Validate we have user data
    if (!signupResult.user) {
      console.error('No user in signup result:', signupResult);
      return { success: false, error: 'Registration failed: No user data in response' };
    }
    
    // Handle pending verification case where user.id might not be immediately available
    if (!signupResult.user.id || signupResult.user.id === 'pending_verification') {
      console.log('User is pending email verification, skipping agent record creation');
      return {
        success: true,
        data: { email: signupResult.user.email || agentData.email },
        message: 'Registration successful! Please verify your email before logging in.',
        partial: true
      };
    }

    // Step 2: Create agent record in database (now user has auth, should bypass RLS)
    // Wait a moment for auth to be ready
    await new Promise(resolve => setTimeout(resolve, 500));

    const agentRecord = {
      id: signupResult.user.id,
      name: agentData.name,
      username: agentData.username || agentData.email.split('@')[0],
      phone_number: agentData.phone_number || null,
      email: agentData.email,
    };

    const { data: agentResult, error: agentError } = await supabase
      .from('agents')
      .insert(agentRecord)
      .select()
      .single();

    if (agentError) {
      console.error('Agent record creation failed:', agentError);
      // Agent record failed but auth user was created - user can still log in
      return {
        success: true,
        data: signupResult.user,
        message: 'Signup successful but profile creation pending. Please log in to complete your profile.',
        partial: true
      };
    }

    return { success: true, data: agentResult };
  } catch (err) {
    console.error('Registration error:', err);
    return { success: false, error: err.message };
  }
};

export const loginAgent = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    
    // Check user role - must be agent to access agent area
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const userMetadata = user.user_metadata || {};
      const role = userMetadata.role;
      
      if (role !== 'agent') {
        // Not an agent - sign them out
        await supabase.auth.signOut();
        return { success: false, error: 'Only agents can access this area. Please check your login credentials or use the admin login page.' };
      }
    }
    
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const logoutAgent = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getCurrentAgent = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'No user logged in' };

    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Agent Partners CRUD operations
export const getAgentPartners = async (agentId) => {
  try {
    const { data, error } = await supabase
      .from('agent_partners')
      .select(`
        *,
        partners (
          id,
          name,
          description,
          photo,
          agent_join_link,
          hosts_join_link
        )
      `)
      .eq('agent_id', agentId);
    if (error) return { success: false, error: error.message };
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const createAgentPartner = async (agentPartner) => {
  try {
    const { data, error } = await supabase.from('agent_partners').insert(agentPartner).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const updateAgentPartner = async (id, updates) => {
  try {
    const { data, error } = await supabase.from('agent_partners').update(updates).eq('id', id).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const deleteAgentPartner = async (id) => {
  try {
    const { error } = await supabase.from('agent_partners').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Get all agent partners for admin
export const getAllAgentPartners = async () => {
  try {
    const { data, error } = await supabase
      .from('agent_partners')
      .select(`
        *,
        agents (
          id,
          name,
          username,
          email
        ),
        partners (
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

export default supabase;


