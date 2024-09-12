import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
  secret,
} from "@aws-amplify/backend";

export const getWeather = defineFunction({
  name: "getWeather",
  entry: "./getWeather.ts",
  environment: {
    WEATHERSTACK_API_KEY: secret("WEATHERSTACK_API_KEY"),
  },
});

const schema = a.schema({
  Temperature: a.customType({
    value: a.integer(),
    unit: a.string(),
  }),

  getWeather: a
    .query()
    .arguments({ city: a.string() })
    .returns(a.ref("Temperature"))
    .authorization((allow) => allow.authenticated())
    .handler(a.handler.function(getWeather)),

  chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: "You are a helpful assistant",
    tools: [
      {
        query: a.ref("getWeather"),
        description: "Provides the current weather for a given city.",
      },
    ],
  }),

  generateRecipe: a
    .generation({
      aiModel: a.ai.model("Claude 3 Haiku"),
      systemPrompt:
        "You are a helpful assistant that generates recipes. Do not return <UNKNOWN> for a property's value.",
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
