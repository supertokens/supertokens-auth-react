import { createClient } from "@supabase/supabase-js";

const getSupabase = (access_token) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

    supabase.auth.session = () => ({
        access_token,
        token_type: "",
        user: null,
    });

    return supabase;
};

export { getSupabase };
