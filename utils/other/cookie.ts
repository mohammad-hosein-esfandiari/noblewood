export const setTokenCookie = (token: string, rememberMe: boolean) => {
    const baseCookie = `NW-AUTH=${token}; path=/; secure; SameSite=Lax;`;
  
    if (rememberMe) {
      // 30 روز
      const maxAge = 60 * 60 * 24 * 30;
      document.cookie = `${baseCookie} max-age=${maxAge}`;
    } else {
      // Session cookie
      document.cookie = baseCookie;
    }
  };

  export const getTokenCookie = (): string | null => {
    const match = document.cookie.match(/(^| )NW-AUTH=([^;]+)/);
    return match ? match[2] : null;
  };

  export const removeTokenCookie = () => {
    document.cookie = "NW-AUTH=; path=/; max-age=0; secure; SameSite=Lax;";
  };