import React from 'react';
import { useAppSelector } from '../core/redux/hooks';
import { GetApiMethod } from '../core/services/apiService';

const WeatherDetailsSection = () => {
    const [cityDetails, setCityDetails] = React.useState<string>();
    const [mainWeatherDetails, setMainWeatherDetails] = React.useState<{
        [index: string]: number;
    }>();
    let locInfoState = useAppSelector((state: any) => state.locationInfo);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ');
    }

    const getLocationInfo = React.useCallback(() => {
        GetApiMethod(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locInfoState?.center?.lat},${locInfoState?.center?.lng}&key=${process.env.REACT_APP_MAP_API_KEY}`
        ).then((res: any) => {
            if (
                res?.data?.status === 'OK' &&
                res?.data?.results?.length &&
                res?.data?.results[0]?.address_components
            ) {
                let addressInfoArray = res?.data?.results;
                const index = addressInfoArray.findIndex((addressInfo: any) =>
                    addressInfo.types.includes('locality')
                );
                if (index > -1 && addressInfoArray[index]?.formatted_address) {
                    setCityDetails(addressInfoArray[index]?.formatted_address);
                }
            }
        });
    }, [locInfoState]);

    const getWeatherInfo = React.useCallback(() => {
        GetApiMethod(
            `https://api.openweathermap.org/data/2.5/weather?lat=${locInfoState?.center?.lat}&lon=${locInfoState?.center?.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        ).then((res: any) => {
            if (res?.data?.main) {
                setMainWeatherDetails({ ...res?.data?.main });
            }
        });
    }, [locInfoState]);

    React.useEffect(() => {
        if (locInfoState?.center?.lat && locInfoState?.center?.lng) {
            getLocationInfo();
            getWeatherInfo();
        }
    }, [locInfoState]);

    return (
        <div className='logo-color'>
            {mainWeatherDetails?.temp && (
                <div
                    className={classNames(
                        mainWeatherDetails?.temp > 30 ? 'text-red-500' : mainWeatherDetails?.temp < 24 ? 'text-yellow-300' : 'text-lime-600',
                        'text-3xl font-bold'
                    )}
                >
                    {mainWeatherDetails?.temp}° C
                </div>
            )}
            {mainWeatherDetails?.temp_max && mainWeatherDetails?.temp_min ? (
                <div
                    className={classNames(
                        mainWeatherDetails?.temp > 30 ? 'text-red-500' : mainWeatherDetails?.temp < 24 ? 'text-yellow-300' : 'text-lime-600',
                        'font-bold'
                    )}
                >
                    Min: {mainWeatherDetails?.temp_min}° C -  Max: {mainWeatherDetails?.temp_max}° C
                </div>
            ): null}
            {mainWeatherDetails?.humidity && (
                <div
                    className={classNames(
                        mainWeatherDetails?.temp > 30 ? 'text-red-500' : mainWeatherDetails?.temp < 24 ? 'text-yellow-300' : 'text-lime-600',
                        'font-bold'
                    )}
                >
                    Humidity : {mainWeatherDetails?.humidity}° C
                </div>
            )}
            {mainWeatherDetails?.pressure && (
                <div
                    className={classNames(
                        mainWeatherDetails?.temp > 30 ? 'text-red-500' : mainWeatherDetails?.temp < 24 ? 'text-yellow-300' : 'text-lime-600',
                        'font-bold'
                    )}
                >
                    Pressure : {mainWeatherDetails?.pressure}
                </div>
            )}
            {mainWeatherDetails?.feels_like && (
                <div
                    className={classNames(
                        mainWeatherDetails?.temp > 30 ? 'text-red-500' : mainWeatherDetails?.temp < 24 ? 'text-yellow-300' : 'text-lime-600',
                        'font-bold'
                    )}
                >
                    Feels Like : {mainWeatherDetails?.feels_like}° C
                </div>
            )}
            <div>
                <span className='font-semibold'>Current coordinates: </span>
                {locInfoState?.center?.lat}, {locInfoState?.center?.lng}
            </div>
            <div>
                <span className='font-semibold'>Current locality: </span>
                {cityDetails ? cityDetails : '-'}
            </div>
        </div>
    );
};

export default WeatherDetailsSection;
