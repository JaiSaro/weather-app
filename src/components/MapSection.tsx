import React from 'react';

export default function MapSection() {
    const [mapCoordinates, setMapCoordinates] = React.useState({
        lat: 32.63975498965483,
        lng: -96.98738218805313,
    });
    const [googleMap, setGoogleMap] = React.useState<google.maps.Map | null>(null);
    const mapRef: any = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        getUserLocation();
        const googleMapTmp: google.maps.Map = new window.google.maps.Map(
            mapRef.current,
            {
                disableDefaultUI: true,
                zoomControl: true,
                draggableCursor: "'crosshair'",
                mapTypeControl: false,
                zoom: 5,
                center: { lat: 32.63975498965483, lng: -96.98738218805313 },
            }
        );
        googleMapTmp.setTilt(0);
        setGoogleMap(googleMapTmp);
    }, []);

    React.useEffect(() => {
      if (googleMap) {
        googleMap.setCenter(mapCoordinates);
      }
    }, [googleMap, mapCoordinates]);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapCoordinates({
                        ...{
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            console.log('Geolocation is not supported in your browser.');
        }
    };

    return <div ref={mapRef} className='map-view'></div>;
}
