// middleware.js
import { NextResponse } from "next/server"; // Works on Vercel Edge
import banned from "./banned-ips.json" assert { type: "json" };

/**
 * Load blocked lists once at module initialization for performance
 */
const blockedExact = new Set(banned.exact || []);
const blockedCidrs = (banned.cidr || []).slice(); // array of strings

/* ---------- helpers ---------- */

// get client IP from headers (trusting Vercel/X-Forwarded-For)
function getClientIP(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  // fallback to request.ip (Vercel provides it at Edge)
  return request.ip || null;
}

// Convert IPv4 dotted quad to 32-bit number (unsigned)
function ipv4ToInt(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) throw new Error("Invalid IPv4");
  return parts.reduce((acc, p) => (acc << 8) + Number(p), 0) >>> 0;
}

// Check if IPv4 is inside an IPv4 CIDR
function ipv4InCidr(ip, cidr) {
  if (!ip || ip.indexOf(".") === -1) return false;
  const [range, bitsStr] = cidr.split("/");
  const bits = Number(bitsStr ?? 32);
  if (isNaN(bits) || bits < 0 || bits > 32) return false;
  try {
    const ipNum = ipv4ToInt(ip);
    const rangeNum = ipv4ToInt(range);
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    return (ipNum & mask) === (rangeNum & mask);
  } catch (e) {
    return false;
  }
}

/* ---------- middleware ---------- */

export function middleware(request) {
  // 1) Get client IP
  const clientIP = getClientIP(request);
  if (!clientIP) {
    // If we can't determine IP, allow (or change to deny by default if preferred)
    return NextResponse.next();
  }

  // 2) Exact match (IPv4 and IPv6)
  if (blockedExact.has(clientIP)) {
    return new NextResponse("Access denied", { status: 403 });
  }

  // 3) CIDR matches (IPv4 only)
  if (clientIP.indexOf(".") !== -1) {
    for (const c of blockedCidrs) {
      if (ipv4InCidr(clientIP, c)) {
        return new NextResponse("Access denied", { status: 403 });
      }
    }
  }

  // not blocked -> continue
  return NextResponse.next();
}

/* Optional: run middleware only for front-end pages (skip api/static)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"]
};
*/
