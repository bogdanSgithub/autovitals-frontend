// Bogdan
import { useRef } from 'react';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const AddressAutocomplete = ({ setCoords }: { setCoords: (latLng: { lat: number; lng: number }) => void }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyChjODftywEX8bMWLCcoxmelouLHd2AcrY&libraries',
    libraries,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry?.location;
      if (location) {
        setCoords({ lat: location.lat(), lng: location.lng() });
      }
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (searchBoxRef.current = ref)}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter an address"
        style={{ width: '80%', padding: '8px' }}
      />
    </StandaloneSearchBox>
  );
};

export default AddressAutocomplete;
