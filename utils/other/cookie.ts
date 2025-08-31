export const setTokenCookie = (name: string, token: string, rememberMe?: boolean) => {
  const baseCookie = `${name}=${token}; path=/; secure; SameSite=Lax;`;

  if (name === "NW-CART") {
    // کوکی فقط 23 ساعت معتبر باشه
    const expires = new Date(Date.now() + 23 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${baseCookie} expires=${expires}`;
  } else if (rememberMe) {
    // 30 روز
    const maxAge = 60 * 60 * 24 * 30;
    document.cookie = `${baseCookie} max-age=${maxAge}`;
  } else {
    // Session cookie (فقط تا وقتی مرورگر بازه)
    document.cookie = baseCookie;
  }
};



export const getTokenCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

export const removeTokenCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; secure; SameSite=Lax;`;
};
