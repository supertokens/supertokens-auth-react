"use server";

import { cookies } from "next/headers";
import { ssrConfig } from "../config/ssr";

export async function unprotectedAction() {
    return Promise.resolve("success");
}
