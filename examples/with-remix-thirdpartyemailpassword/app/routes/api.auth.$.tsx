import { json } from "@remix-run/node";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import handleAuthAPIRequest from '../lib/authAPIRequestHandler.js';
import { PartialRemixRequest } from "../lib/superTokensTypes.js"

const handleCall = handleAuthAPIRequest(Response);

function createPartialRemixRequest(request: Request): PartialRemixRequest {
  const headers = new Headers();
  request.headers.forEach((value: string, key: string) => { 
    headers.append(key, value);
  });

  return {
    method: request.method as string,
    url: request.url as string,
    headers: headers,
    formData: async () => await request.formData(),
    json: async () => await request.json(),
    cookies: {
      getAll: () => {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
          return cookieHeader.split(";").map((cookieString: string) => {
            const [name, value] = cookieString.trim().split("=");
            return { name, value } as { name: string; value: string };
          });
        } else {
          return [];
        }
      },
    },
  };
}
// Action function for handling POST requests
export async function action({ request }: ActionFunctionArgs) {
  try {
    const partialRemixRequest = createPartialRemixRequest(request);
    const res = await handleCall(partialRemixRequest);
    return res;
  } catch (error) {
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
// Loader function for handling GET requests that also adds cache control headers
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const partialRemixRequest = createPartialRemixRequest(request);
    const res = await handleCall(partialRemixRequest);
    if (!res.headers.has("Cache-Control")) {
      res.headers.set(
        "Cache-Control",
        "no-cache, no-store, max-age=0, must-revalidate"
      );
    }
    return res;
  } catch (error) {
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
