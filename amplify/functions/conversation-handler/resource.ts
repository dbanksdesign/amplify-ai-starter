import { defineConversationHandlerFunction } from "@aws-amplify/backend-ai/conversation";

export const customConversationHandlerFunction =
  defineConversationHandlerFunction({
    name: "customConversationHandlerFunction",
    entry: "./handler.ts",
    models: [
      {
        modelId: "anthropic.claude-3-haiku-20240307-v1:0",
        region: "us-west-2",
      },
    ],
  });
