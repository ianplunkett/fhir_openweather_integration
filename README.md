# Open Weather Map Overview Example
This repository provides a rudimentary example of typescript that takes an FHIR Patient resource and an OpenWeatherMap AppId as input, and outputs the weather summary text from OpenWeatherMap’s Weather Overview API.

`weatherSummary.ts` contains simple functions to call the OpenWeatherMap API and `index.ts` provide a test example to run the code. 


## Setup
1. Copy `.env_example` to `.env` and add your app id. You can find your app id here https://home.openweathermap.org/api_keys
```
cp .env_example .env
```

2. Install the FHIR types via npm 

``` shell
npm install
```

3. Create a patient resource. The example code in `index.ts` includes a single FHIR Patient object. Use this as a starting point.

``` js 
// Patient object with proper typing
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

```



## Run the code
Once a valid API key has been supplied, you can use `npx` to run the example. 

```
npx ts-node index.ts                                             
Currently, the weather is partly cloudy with a temperature of 73°F and a wind speed of 16
miles/hour. The humidity is at 54%, and the visibility is at 10,000 miles. The dew point is at
56°F, and the pressure is at 1014. The UV index is high at 9, so it's important to take precautions
if you're spending extended time outdoors. Overall, it's a pleasant day with some cloud cover and a
moderate breeze. If you're heading out, you may want to bring a light jacket or sweater to stay
comfortable in the slightly cooler temperatures. Enjoy the rest of your day!


```
