import React from "react";
import { Schema } from "../../amplify/data/resource";
import { client } from "../client";

interface ConversationsContextType {
  conversations: Schema["chat"]["type"][];
  setConversations: React.Dispatch<
    React.SetStateAction<Schema["chat"]["type"][]>
  >;
  updateConversation: (
    conversation: Partial<Schema["chat"]["type"]> & { id: string }
  ) => void;
  createConversation: () => Promise<Schema["chat"]["type"] | undefined>;
  deleteConversation: (input: { id: string }) => void;
}

export const ConversationsContext =
  React.createContext<ConversationsContextType>({
    conversations: [],
    setConversations: () => {},
    updateConversation: () => {},
    createConversation: async () => {
      return new Promise((resolve) => resolve(undefined));
    },
    deleteConversation: () => {},
  });

export const ConversationsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [conversations, setConversations] = React.useState<
    Schema["chat"]["type"][]
  >([]);

  React.useEffect(() => {
    client.conversations.chat.list().then((res) => {
      if (res.data) {
        setConversations(
          res.data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        );
      }
    });
  }, []);

  const updateConversation: ConversationsContextType["updateConversation"] = (
    conversation
  ) => {
    client.conversations.chat.update(conversation).then((res) => {
      if (res.data) {
        // @ts-expect-error todo
        setConversations((prev) => {
          const index = prev.findIndex((c) => c.id === conversation.id);
          if (index !== -1) {
            // @ts-expect-error todo
            prev[index] = res.data;
            return [...prev];
          } else {
            return [res.data, ...prev];
          }
        });
      }
    });
  };

  const deleteConversation = async ({ id }: { id: string }) => {
    const { data } = await client.conversations.chat.delete({ id });
    console.log({ data });

    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  const createConversation = async () => {
    const { data: conversation } = await client.conversations.chat.create();
    if (conversation) {
      setConversations((prev) => [conversation, ...prev]);
      return conversation;
    }
  };

  const value = {
    conversations,
    setConversations,
    updateConversation,
    createConversation,
    deleteConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
