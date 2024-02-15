import { NextResponse } from "next/server";
import context from "@/storage";
import type { NextRequest, NextFetchEvent } from "next/server";

function wrapper(req: Request, res: Response, fn: typeof NextResponse.next) {
  // @ts-expect-error
  return context.middleware(req, res, fn);
}

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return wrapper(request, response, NextResponse.next);
}
