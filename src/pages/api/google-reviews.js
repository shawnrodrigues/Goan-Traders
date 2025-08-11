export async function GET(context) {
  const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY;
  const PLACE_ID = import.meta.env.GOOGLE_PLACE_ID;

  if (!GOOGLE_API_KEY || !PLACE_ID) {
    return new Response(
      JSON.stringify({ error: 'Missing API key or Place ID in environment variables' }),
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&key=${GOOGLE_API_KEY}&fields=reviews`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API response not ok:', errorText);
      return new Response(
        JSON.stringify({ error: `Google API error: ${response.statusText}` }),
        { status: 500 }
      );
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google API returned error status:', data.status, data.error_message);
      return new Response(
        JSON.stringify({ error: data.error_message || 'Unknown error from Google API' }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ reviews: data.result.reviews || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Failed to fetch reviews:', err.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch reviews from Google API' }),
      { status: 500 }
    );
  }
}
