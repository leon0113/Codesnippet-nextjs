import { Database } from '@/lib/types/supabase';
import { createClient } from '@supabase/supabase-js'

export async function GET(req: Request) {

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    console.log(id);

    if (id === "*") {
        const result = await supabase.from("blogs").select("id").limit(10);
        return Response.json({ ...result });
    } else if (id) {
        const result = await supabase.from("blogs").select("*").eq("id", id).single();
        return Response.json({ ...result });
    } else {
        return Response.json({});
    }

}