"use client";

import { use, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  address: string;
  className?: string;
}

export function GoogleMap({ address, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (!mapRef.current) return;

      setIsLoading(true);
      setError(null);

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
            if (!isMounted) return;

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
              setIsLoading(false);
            } else {
              setError("地図の読み込みに失敗しました");
              setIsLoading(false);
            }
          }
        );
      } catch (error) {
        if (!isMounted) return;
        console.error("Error loading Google Maps:", error);
        setError("地図の読み込みに失敗しました");
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [address]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full min-h-[200px]" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      )}
    </div>
  );
}
