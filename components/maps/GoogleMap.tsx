import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  address: string;
  className?: string;
}

export function GoogleMap({ address, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
        libraries: ["places", "geometry"],
      });

      try {
        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { address },
          (
            results: google.maps.GeocoderResult[] | null,
            status: google.maps.GeocoderStatus
          ) => {
            if (status === "OK" && results && results[0] && mapRef.current) {
              const map = new google.maps.Map(mapRef.current, {
                center: results[0].geometry.location,
                zoom: 16,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              });

              new google.maps.Marker({
                map,
                position: results[0].geometry.location,
              });
            }
          }
        );
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (mapRef.current) {
      initMap();
    }
  }, [address]);

  return <div ref={mapRef} className={className} />;
}
