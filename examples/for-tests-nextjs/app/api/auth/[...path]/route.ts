import { getAppDirRequestHandler } from "supertokens-node/nextjs";
import Session, { refreshSessionWithoutRequestResponse } from "supertokens-node/recipe/session";
import { NextRequest, NextResponse } from "next/server";
import { ensureSuperTokensInit } from "../../../config/backend";
import { cookies } from "next/headers";

ensureSuperTokensInit();

const handleCall = getAppDirRequestHandler();

export async function GET(request: NextRequest) {
    const res = await handleCall(request);
    if (!res.headers.has("Cache-Control")) {
        // This is needed for production deployments with Vercel
        res.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    }
    return res;
}

export async function POST(request: NextRequest) {
    return handleCall(request);
}

export async function DELETE(request: NextRequest) {
    return handleCall(request);
}

export async function PUT(request: NextRequest) {
    return handleCall(request);
}

export async function PATCH(request: NextRequest) {
    return handleCall(request);
}

export async function HEAD(request: NextRequest) {
    return handleCall(request);
}
