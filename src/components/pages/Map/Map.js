import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import styles from "./Map.module.css";
import "@reach/combobox/styles.css";

function Map() {
  const [ libraries ] = useState(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <LoadMap />;
}

function LoadMap() {
  const [center, setCenter] = useState({lat: 53.3498, lng: -6.2603});
  const [zoom, setZoom] = useState(12);
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.map_container}>
      <div className={styles.location_coordinates_container}>
        <div className={styles.location}>
          <PlacesAutocomplete setZoom={setZoom} setCenter={setCenter} setSelected={setSelected} />
        </div>
        <div className={styles.coordinates}>
          <input
            className={styles.search}
            type="search"
            placeholder="Coordinates"
          />
        </div>
      </div>

      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName={styles.map_container}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
      <button className={styles.btn_save}>
        Save
      </button>
    </div>
  );
}

export default Map;
