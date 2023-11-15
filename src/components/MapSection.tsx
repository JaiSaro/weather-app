import React, { RefObject } from 'react';
import { useAppDispatch } from '../core/redux/hooks';
import { setLocationCoordinates } from '../core/redux/locationInfoSlice';

export default function MapSection() {
    const [mapCoordinates, setMapCoordinates] =
        React.useState<google.maps.LatLngLiteral>({
            lat: 32.63975498965483,
            lng: -96.98738218805313,
        });
    const [googleMap, setGoogleMap] = React.useState<google.maps.Map | null>(
        null
    );
    const mapRef: RefObject<any> = React.useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        getUserLocation();
        const googleMapTmp: google.maps.Map = new window.google.maps.Map(
            mapRef.current,
            {
                disableDefaultUI: true,
                zoomControl: true,
                draggableCursor: "'crosshair'",
                mapTypeControl: false,
                zoom: 10,
                center: { lat: 32.63975498965483, lng: -96.98738218805313 },
            }
        );
        googleMapTmp.setTilt(0);
        setGoogleMap(googleMapTmp);
        googleMapTmp.addListener("click", (mapsMouseEvent: any) => {
            let latLng = mapsMouseEvent.latLng.toJSON();
            if (latLng) {
                setMapCoordinates(latLng);
            }
        });
    }, []);

    React.useEffect(() => {
        if (googleMap && mapCoordinates?.lat && mapCoordinates?.lng) {
            googleMap.setCenter(mapCoordinates);
            dispatch(setLocationCoordinates(mapCoordinates));
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
