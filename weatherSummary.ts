import { Patient } from "@medplum/fhirtypes";

/**
 * Interface representing the response from the OpenWeather API for geolocation.
 */
export interface GeoResponse {
    lat: number;
    lon: number;
}

/**
 * Interface representing the weather overview response from the OpenWeather API.
 */
export interface WeatherOverviewResponse {
    lat: number;
    lon: number;
    tz: string;
    date: string;
    units: "standard" | "metric" | "imperial";
    weather_overview: string;
}

/**
 * Function to get the latitude and longitude for a given zip code and country.
 *
 * @param zip - The zip code to get the coordinates for.
 * @param country - The country code associated with the zip code.
 * @param appId - The OpenWeather API key.
 * @returns A promise that resolves to a GeoResponse object containing the latitude and longitude.
 * @throws Will throw an error if the OpenWeather API key is missing or if there is an error fetching the coordinates.
 */
export async function zipToLatLong(
    zip: string,
    country: string,
    appId: string,
): Promise<GeoResponse> {
    if (!appId) {
        throw new Error("OpenWeather API key is missing.");
    }

    const endpoint = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${appId}`;
    const response = await fetch(endpoint);
    const data = (await response.json()) as GeoResponse;

    if (!response.ok) {
        throw new Error(`Error fetching coordinates: ${JSON.stringify(data)}`);
    }

    return data;
}

/**
 * Function to get a weather summary for a given patient.
 *
 * @param patient - The patient object containing address information.
 * @param appId - The OpenWeather API key.
 * @returns A promise that resolves to a string containing the weather overview.
 * @throws Will throw an error if the patient's address is missing postal code or country, or if there is an error fetching the weather data.
 */
export async function getWeatherSummary(
    patient: Patient,
    appId: string,
): Promise<string> {
    const zip = patient.address?.[0].postalCode;
    const country = patient.address?.[0].country;

    if (!zip || !country) {
        throw new Error("Patient address is missing postal code or country.");
    }

    const coords = await zipToLatLong(zip, country, appId);
    // standard, metric, imperial
    const units = "imperial";

    const endpoint = `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${coords.lat}&lon=${coords.lon}&appid=${appId}&units=${units}`;
    const response = await fetch(endpoint);
    const data = (await response.json()) as WeatherOverviewResponse;

    if (!response.ok) {
        throw new Error(`Error fetching weather data: ${JSON.stringify(data)}`);
    }

    return data.weather_overview;
}
