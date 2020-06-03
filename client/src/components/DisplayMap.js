import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import mapStyles from './MapStyles';

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

export default function () {
  const [currentPos, setCurrentPos] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [selected, setSelected] = useState(null);
  const libraries = ['places'];

  const getLatLng = (position) => {
    const currentPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setCurrentPos(currentPos);

    const currentLoc = `${currentPos.lat},${currentPos.lng}`;
    fetchHospital(currentLoc);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLatLng);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDZuPgVRz-vmxBgoy7Ix6toOLAvZPWq0S4',
    libraries,
  });

  const fetchHospital = async (currentLoc) => {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLoc}&radius=5000&type=hospital&key=AIzaSyDZuPgVRz-vmxBgoy7Ix6toOLAvZPWq0S4`;
    const result = await fetch(proxyurl + url);
    const response = await result.json()
    const { results } = response
    setHospitals(results)
  };


  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={currentPos}
      options={options}>
      {hospitals.map((hospital) =>
        hospital.name.toLowerCase().includes('sakit') ||
        hospital.name.toLowerCase().includes('rs') ||
        hospital.name.toLowerCase().includes('hospital') ? (
          <Marker
            position={{
              lat: hospital.geometry.location.lat,
              lng: hospital.geometry.location.lng,
            }}
            title={hospital.name}
            description={hospital.vicinity}
            key={hospital.id}
            icon={{
              url: `/medical.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(24, 24),
            }}
            onClick={() => {
              setSelected(hospital);
            }}
          />
        ) : (
          <></>
        )
      )}

      {currentPos && (
        <Marker
          position={{ lat: currentPos.lat, lng: currentPos.lng }}
          title="My-location"
          icon={{
            url: `/mylocation.png`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      )}

      {selected ? (
        <InfoWindow
          position={{
            lat: selected.geometry.location.lat,
            lng: selected.geometry.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}>
          <div>
            <h5>
              <span role="img" aria-label="bear">
                🏥
              </span>{' '}
              {selected.name}
            </h5>
            <p>{selected.vicinity}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
