import { json } from "@remix-run/node";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import getAppDirRequestHandler from '../lib/remixAuthAPIRequestHandler.js'; // Adjust the path accordingly

const handleCall = getAppDirRequestHandler(Response);

// Type based on the PartialNextRequest type (same properties)

export type PartialRemixRequest = {
  method: string;
  url: string;
  headers: Headers;
  formData: () => Promise<FormData>;
  json: () => Promise<unknown>;
  cookies: {
    getAll: () => { name: string; value: string }[];
  };
};

// In Remix, the request lacks the `cookies` property required by getAppDirRequestHandler, so a new object is created to include that property.

function createPartialRemixRequest(request: Request): PartialRemixRequest {
  const headers = new Headers();
  request.headers.forEach((value, key) => {
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
          return cookieHeader.split(";").map((cookieString) => {
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
