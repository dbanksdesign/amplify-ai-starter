import { env } from "$amplify/env/getWeather";
import type { Schema } from "./resource";

export const handler: Schema["getWeather"]["functionHandler"] = async (
  event
) => {
  // mock data
  return {
    value: 100,
    unit: "fahrenheit",
  };

  // uncomment this to use a real API

  // const res = await fetch(
  //   `http://api.weatherstack.com/current?access_key=${
  //     env.WEATHERSTACK_API_KEY
  //   }&units=f&query=${encodeURIComponent(event.arguments.city ?? "")}`
  // );

  // const weather = await res.json();

  // return {
  //   value: weather.current.temperature,
  //   unit: weather.request.unit,
  // };
};
