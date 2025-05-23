// Bogdan
import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

interface NearbyMapProps {
  location: { lat: number; lng: number };
  radius?: number;
  type?: string;
}

const NearbyMap: React.FC<NearbyMapProps> = ({ location, radius = 100, type = "car_repair" }) => {
  const apiKey = "AIzaSyChjODftywEX8bMWLCcoxmelouLHd2AcrY";

  if (!apiKey) {
    throw new Error("Google Maps API key is missing");
  }
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const service = new google.maps.places.PlacesService(mapRef.current);

    const request: google.maps.places.PlaceSearchRequest = {
      location,
      radius,
      type,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      } else {
        console.error("PlacesService error:", status);
      }
    });
  }, [isLoaded, location, radius, type]);

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      center={location}
      zoom={14}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      <Marker position={location} />
      {places.map((place, idx) => (
        place.geometry?.location && (
          <Marker
            key={idx}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
          />
        )
      ))}
    </GoogleMap>
  );
};

export default NearbyMap;
