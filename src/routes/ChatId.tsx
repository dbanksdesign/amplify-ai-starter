import * as React from "react";
import { useParams } from "react-router-dom";
import { client, useAIConversation } from "../client";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { ConversationsContext } from "../components/ConversationsProvider";
import ReactMarkdown from "react-markdown";

export const ChatIdPage = () => {
  const params = useParams();
  const { updateConversation } = React.useContext(ConversationsContext);
  const id = params.chatId ?? "";
  const [
    {
      data: { messages, conversation },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", {
    id,
  });

  return (
    <AIConversation
      allowAttachments
      messages={messages}
      handleSendMessage={(message) => {
        sendMessage(message);
        // only run this on the first message...
        if (!conversation?.name) {
          client.generations
            .chatNamer({
              content: message.content.map((c) => c.text ?? "").join(""),
            })
            .then((res) => {
              updateConversation({
                id,
                name: res.data?.name ?? "",
              });
            });
        }
      }}
      isLoading={isLoading}
      messageRenderer={{
        text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
      }}
    />
  );
};
