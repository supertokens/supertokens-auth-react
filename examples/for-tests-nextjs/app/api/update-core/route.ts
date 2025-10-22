import { getCoreUrl } from "@/app/config/backend";
import { NextResponse, NextRequest } from "next/server";
import { withSession } from "supertokens-node/nextjs";

export async function POST(request: NextRequest) {
    const updatePayload: Record<string, unknown> = {};
    const coreUrl = getCoreUrl();

    await fetch(`${coreUrl}/recipe/multitenancy/connectionuridomain/v2`, {
        method: "PUT",
        body: JSON.stringify(updatePayload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return NextResponse.json({});
}
