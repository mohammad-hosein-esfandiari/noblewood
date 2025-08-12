type FetchCacheOption = "default" | "no-store" | "reload" | "force-cache" | "only-if-cached";

interface SafeFetchOptions extends RequestInit {
  cache?: FetchCacheOption; // کش دلخواه نکست‌جی‌اس
}

export async function safeFetch<T>(
  url: string,
  options?: SafeFetchOptions
): Promise<{ ok: boolean; data: T | null }> {
  try {
    // گزینه‌های پیش‌فرض
    const fetchOptions: RequestInit = {
      cache: options?.cache || "default",
      ...options,
    };

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.error(`❌ Fetch failed: ${url} Status: ${res.status}`);
      return { ok: false, data: null };
    }

    const data: T = await res.json();
    return { ok: true, data };
  } catch (err) {
    console.error(`❌ Network error: ${url}`, err);
    return { ok: false, data: null };
  }
}
