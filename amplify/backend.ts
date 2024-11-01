import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data, getWeather } from "./data/resource";

defineBackend({
  auth,
  data,
  getWeather,
});
