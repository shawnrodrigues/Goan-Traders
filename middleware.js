import banned from "./banned-ips.json" assert { type: "json" };

// Convert banned lists
const blockedExact = new Set(banned.exact || []);
const blockedCidrs = banned.cidr || [];

/* ------------------ IP HELPERS ------------------ */

// Extract real client IP
function getClientIP(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  return request.ip ?? null;
}

// Convert IPv4 to 32-bit number
function ipv4ToInt(ip) {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + Number(oct), 0) >>> 0;
}

// Check if IPv4 is in CIDR
function ipv4InCidr(ip, cidr) {
  const [range, bitsStr] = cidr.split("/");
  const bits = Number(bitsStr ?? 32);
  const ipNum = ipv4ToInt(ip);
  const rangeNum = ipv4ToInt(range);
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return (ipNum & mask) === (rangeNum & mask);
}

/* ------------------ MIDDLEWARE ------------------ */

export function middleware(request) {
  const ip = getClientIP(request);

  // 1) Exact match
  if (ip && blockedExact.has(ip)) {
    return new Response("Access denied (exact IP block)", { status: 403 });
  }

  // 2) CIDR match
  if (ip && ip.includes(".")) {
    for (const cidr of blockedCidrs) {
      if (ipv4InCidr(ip, cidr)) {
        return new Response("Access denied (CIDR blocked)", { status: 403 });
      }
    }
  }

  // Allow request
  return;
}
