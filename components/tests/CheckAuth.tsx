"use client"
import { useEffect, useState } from "react";

export default function CheckAuth() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/routes/auth/verify", { credentials: "include" });
        const data = await res.json();

        if (data.loggedIn) {
          setLoggedIn(true);
          setUserId(data.userId);
        } else {
          setLoggedIn(false);
          setUserId(null);
        }
      } catch (err) {
        setLoggedIn(false);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!loggedIn) return <p>Please login to access this page.</p>;

  return <p>Welcome user #{userId}!</p>;
}
