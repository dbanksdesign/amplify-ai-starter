import * as React from "react";
import { useParams } from "react-router-dom";
import { client, useAIConversation } from "../client";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { ConversationsContext } from "../components/ConversationsProvider";

export const ChatIdPage = () => {
  const params = useParams();
  const { updateConversation } = React.useContext(ConversationsContext);

  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation("chat", {
    id: params.chatId,
  });

  const props = {
    messages,
    isLoading,
    handleSendMessage: React.useCallback<typeof handleSendMessage>(
      (message) => {
        handleSendMessage(message);
        // only run this on the first message...
        client.generations
          .chatNamer({
            content: message.content.map((c) => c.text ?? "").join(""),
          })
          .then((res) => {
            updateConversation({
              id: params.chatId ?? "",
              name: res.data?.name ?? "",
            });
          });
      },
      [params.chatId, updateConversation, handleSendMessage]
    ),
  };

  return <AIConversation {...props} />;
};
