import { config } from "dotenv";
import { Patient } from "@medplum/fhirtypes";
import { getWeatherSummary } from "./weatherSummary";

// Load environment variables from .env file
config();

// Define a Patient object with the proper typing
const myPatient: Patient = {
    resourceType: "Patient",
    id: "123",
    name: [{ family: "Smith", given: ["John"] }],
    address: [
        {
            line: ["2135 Ascot Dr"],
            city: "Moraga",
            state: "CA",
            postalCode: "94556",
            country: "US",
        },
    ],
};

// Get the OpenWeather API key from environment variables
const appId = process.env.OPENWEATHER_API_KEY;

// Check if the API key is available
if (!appId) {
    throw new Error("OpenWeather API key is missing.");
}

// Call the function to get the weather summary for the specified patient
getWeatherSummary(myPatient, appId)
    .then((summary) => {
        console.log(summary);
    })
    .catch((error) => {
        console.error(error);
    });
