import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import styles from "./Map.module.css";
import Geocode from "react-geocode";

function Map() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <LoadMap />;
}

function LoadMap() {
  const [center, setCenter] = useState({ lat: 53.3498114, lng: -6.2602525 });
  const [zoom, setZoom] = useState(12);
  const [selected, setSelected] = useState(null);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  function onMarkerDragEnd(coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setSelected({ lat, lng });

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        document.querySelector(".Map_combobox_input__ONzu7").value = address;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div className={styles.map_container}>
      <div className={styles.location_coordinates_container}>
          <PlacesAutocomplete
            setZoom={setZoom}
            setCenter={setCenter}
            setSelected={setSelected}
            selected={selected}
          />
      </div>

      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName={styles.map_container}
      >
        {selected && (
          <Marker
            position={selected}
            draggable={true}
            onDragEnd={(coord) => onMarkerDragEnd(coord)}
          />
        )}
      </GoogleMap>
      <button className={styles.btn_save}>Save</button>
    </div>
  );
}

export default Map;
