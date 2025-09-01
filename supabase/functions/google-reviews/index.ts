import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GoogleReview {
  author_name: string;
  rating: number;
  text?: string;
  time: number;
  profile_photo_url?: string;
}

interface GooglePlacesResponse {
  result: {
    reviews: GoogleReview[];
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    
    if (!googleApiKey) {
      console.error('Google Places API key not found');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Primeiro, vamos tentar extrair o Place ID do link compartilhado
    // O link fornecido: https://share.google/WoTEhUtzFHU0ih2eI
    // Vamos usar um Place ID conhecido ou buscar pelo nome/localização
    
    // Para agora, vou usar um approach de busca por texto para encontrar o negócio
    // Vamos buscar por "Bravissea" ou similar
    const searchQuery = "Bravissea Rio de Janeiro";
    
    // Primeiro, fazer uma busca para encontrar o Place ID
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${googleApiKey}`
    );
    
    if (!searchResponse.ok) {
      console.error('Error searching for place:', await searchResponse.text());
      return new Response(
        JSON.stringify({ error: 'Failed to search for place' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const searchData = await searchResponse.json();
    console.log('Search results:', searchData);
    
    if (!searchData.results || searchData.results.length === 0) {
      console.error('No places found for search query');
      return new Response(
        JSON.stringify({ error: 'Place not found' }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const placeId = searchData.results[0].place_id;
    console.log('Found Place ID:', placeId);
    
    // Agora buscar os detalhes do lugar incluindo reviews
    const detailsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${googleApiKey}`
    );
    
    if (!detailsResponse.ok) {
      console.error('Error fetching place details:', await detailsResponse.text());
      return new Response(
        JSON.stringify({ error: 'Failed to fetch place details' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const detailsData: GooglePlacesResponse = await detailsResponse.json();
    console.log('Place details:', detailsData);
    
    if (!detailsData.result || !detailsData.result.reviews) {
      console.log('No reviews found for this place');
      return new Response(
        JSON.stringify({ 
          reviews: [],
          error: 'No reviews found' 
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Formatar os reviews para o formato esperado pelo frontend
    const formattedReviews = detailsData.result.reviews.map((review: GoogleReview) => ({
      name: review.author_name,
      location: "Google Reviews",
      rating: review.rating,
      text: review.text || "",
      vessel: "Avaliação Google",
      avatar: review.profile_photo_url || "/lovable-uploads/placeholder-avatar.png",
      date: new Date(review.time * 1000).toLocaleDateString('pt-BR')
    }));
    
    console.log('Formatted reviews:', formattedReviews);
    
    return new Response(
      JSON.stringify({ 
        reviews: formattedReviews,
        total_reviews: formattedReviews.length
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error in google-reviews function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});