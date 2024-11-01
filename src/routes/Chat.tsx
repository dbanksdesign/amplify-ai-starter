import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { View, Button, Flex, ScrollView, Text } from "@aws-amplify/ui-react";
import { CreateChat } from "../components/CreateChat";
import {
  ConversationsContext,
  ConversationsProvider,
} from "../components/ConversationsProvider";

export const Sidebar = () => {
  const { conversations, deleteConversation } =
    React.useContext(ConversationsContext);

  return (
    <Flex direction="column" width="500px" height="100%">
      <ScrollView flex="1">
        <Flex direction="column">
          {conversations.map((conversation) => (
            <Flex direction="row" key={conversation.id} alignItems="center">
              <Flex direction="column" flex="1">
                <Link to={`/chat/${conversation.id}`}>
                  {conversation.name ?? conversation.id}
                </Link>
                <Text>
                  {new Date(conversation.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      hour12: true,
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </Text>
              </Flex>
              <Button
                onClick={() => deleteConversation({ id: conversation.id })}
              >
                X
              </Button>
            </Flex>
          ))}
        </Flex>
      </ScrollView>
      <Flex direction="row" padding="large">
        <CreateChat />
      </Flex>
    </Flex>
  );
};

export const Chat = () => {
  return (
    <ConversationsProvider>
      <Flex direction="row" flex="1" padding="large">
        <Sidebar />
        <View flex="1">
          <Outlet />
        </View>
      </Flex>
    </ConversationsProvider>
  );
};
