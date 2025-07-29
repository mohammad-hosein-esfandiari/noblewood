'use client';

import React, { useEffect, useState } from 'react';

interface SiteInfoResult {
  site_title: string;
  site_description: string;
  site_url: string;
  logo_url: string;
  favicon_url: string;
}

interface ApiResponse {
  status: string;
  message: string;
  result: SiteInfoResult | null;
}

export default function SiteInfo() {
  const [siteInfo, setSiteInfo] = useState<SiteInfoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('Base URL:', window.location.origin);
    async function fetchSiteInfo() {
      try {
        const res = await fetch('/api/routes/site-info', {
          method: 'GET'
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();

        if (data.status !== 'success') {
          throw new Error(data.message);
        }

        setSiteInfo(data.result);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchSiteInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!siteInfo) return <div>No data</div>;

  return (
    <div>
      <h1>{siteInfo.site_title}</h1>
      <p>{siteInfo.site_description}</p>
      {siteInfo.logo_url && <img src={siteInfo.logo_url} alt="Logo" style={{ maxWidth: 200 }} />}
      {siteInfo.favicon_url && <img src={siteInfo.favicon_url} alt="Favicon" style={{ maxWidth: 50 }} />}
    </div>
  );
}
