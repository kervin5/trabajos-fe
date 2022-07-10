import { useEffect, useState } from 'react';

export function useGuestLocation() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ status: string; country?: string; city?: string } | null>(
    null
  );

  useEffect(() => {
    setLoading(true);
    const guestLocation = localStorage.getItem('guestLocation');

    if (guestLocation && guestLocation?.includes('success')) {
      setData(JSON.parse(guestLocation));

      setLoading(false);
    } else {
      fetch(`/api/location`).then((response) => {
        response.json().then((parsed) => {
          setData(parsed);
          localStorage.setItem('guestLocation', parsed);
          setLoading(false);
        });
      });
    }
  }, []);

  return { data, loading };
}

export default useGuestLocation;
