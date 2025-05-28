// app/api/waitlist/count/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(req: NextRequest) {
  try {
    // Await the createClient function since it returns a Promise
    const supabase = await createClient();

    // Call the stored function to get the count
    const { data, error } = await supabase.rpc("get_signup_count");

    if (error) {
      console.error("Error fetching signup count:", error);
      return NextResponse.json(
        { error: "Failed to fetch signup count" },
        { status: 500 }
      );
    }

    // Return the count
    return NextResponse.json({ count: data || 0 }, { status: 200 });
  } catch (error) {
    console.error("Error in count API:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
