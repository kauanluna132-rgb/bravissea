import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Tipos do Places API (New)
interface PlacesSearchResponse {
  places?: Array<{
    id?: string;
    name?: string;
    formattedAddress?: string;
  }>;
}

interface PlacesDetailsReviewText {
  text?: string;
  languageCode?: string;
}

interface PlacesDetailsReviewAuthor {
  displayName?: string;
  photoUri?: string;
}

interface PlacesDetailsReview {
  authorAttribution?: PlacesDetailsReviewAuthor;
  rating?: number;
  text?: PlacesDetailsReviewText;
  publishTime?: string; // ISO date string
}

interface PlacesDetailsResponse {
  reviews?: PlacesDetailsReview[];
  rating?: number;
  userRatingCount?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!googleApiKey) {
      console.error('Google Places API key not found');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { placeId, searchQuery, shareUrl } = await (async () => {
      try {
        const body = await req.json();
        return body || {};
      } catch {
        return {} as any;
      }
    })();

    // 1) Resolver Place ID
    let resolvedPlaceId: string | undefined = placeId;

    // Tenta extrair place id de shareUrl (se for URL do Google Maps)
    if (!resolvedPlaceId && typeof shareUrl === 'string') {
      const match = shareUrl.match(/place_id=([A-Za-z0-9_-]+)/);
      if (match) {
        resolvedPlaceId = match[1];
      }
    }

    // Se ainda não tiver place id, usa busca por texto no Places API (New)
    if (!resolvedPlaceId) {
      const query = searchQuery || 'Bravissea Rio de Janeiro';
      const searchResp = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': googleApiKey,
        },
        body: JSON.stringify({ textQuery: query }),
      });

      if (!searchResp.ok) {
        const txt = await searchResp.text();
        console.error('Places searchText error:', txt);
        return new Response(JSON.stringify({ error: 'Failed to search place (Places API New)' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const searchData: PlacesSearchResponse = await searchResp.json();
      if (!searchData.places || searchData.places.length === 0 || !searchData.places[0].id) {
        console.error('No places found for query');
        return new Response(JSON.stringify({ error: 'Place not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      resolvedPlaceId = searchData.places[0].id;
      console.log('Resolved Place ID (new API):', resolvedPlaceId);
    }

    // 2) Buscar detalhes com reviews no Places API (New)
    // GET https://places.googleapis.com/v1/places/{placeId}
    // Header: X-Goog-FieldMask: reviews,rating,userRatingCount
    const detailsUrl = `https://places.googleapis.com/v1/places/${resolvedPlaceId}`;
    const detailsResp = await fetch(detailsUrl, {
      headers: {
        'X-Goog-Api-Key': googleApiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      },
    });

    if (!detailsResp.ok) {
      const txt = await detailsResp.text();
      console.error('Places details error:', txt);
      return new Response(JSON.stringify({ error: 'Failed to fetch place details (Places API New)' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const detailsData: PlacesDetailsResponse = await detailsResp.json();

    const reviews = (detailsData.reviews || []).map((r) => {
      const name = r.authorAttribution?.displayName || 'Cliente Google';
      const rating = r.rating ?? 0;
      const text = r.text?.text || '';
      const date = r.publishTime ? new Date(r.publishTime).toLocaleDateString('pt-BR') : '';
      const photo = r.authorAttribution?.photoUri;
      return {
        name,
        location: 'Google Reviews',
        rating,
        text,
        vessel: 'Avaliação Google',
        avatar: photo || '',
        date,
      };
    });

    return new Response(
      JSON.stringify({ reviews, total_reviews: reviews.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in google-reviews function:', error?.message || error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error?.message || error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});