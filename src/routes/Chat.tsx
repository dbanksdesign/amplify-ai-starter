import { AIConversation } from "@aws-amplify/ui-react-ai";
import { Flex, Text, View } from "@aws-amplify/ui-react";
import { useAIConversation } from "../client";

export const Chat = () => {
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation("chat");
  // 'chat' here should be the key in your schema

  return (
    <View flex="1" padding="large">
      <AIConversation
        messages={messages}
        handleSendMessage={sendMessage}
        // Suggested prompts will show up in the empty state
        // of the chat screen.
        // suggestedPrompts={[
        //   {
        //     inputText: "What is the weather in Tokyo?",
        //     header: "Weather in Tokyo",
        //   },
        // ]}

        // Response components allow the chatbot to
        // render custom React components in the response.
        responseComponents={{
          Weather: {
            description: "Used to display the weather",
            component: (props) => {
              return (
                <Flex direction="row" color="font.tertiary" alignItems="center">
                  <Text fontWeight="light" fontSize="large">
                    {props.value}
                  </Text>
                </Flex>
              );
            },
            props: {
              value: { type: "string" },
            },
          },
        }}
      />
    </View>
  );
};
