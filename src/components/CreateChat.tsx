import { Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ConversationsContext } from "./ConversationsProvider";

export const CreateChat = () => {
  const navigate = useNavigate();

  const { createConversation } = React.useContext(ConversationsContext);

  const handleClick = async () => {
    const conversation = await createConversation();
    if (conversation) {
      navigate(`/chat/${conversation.id}`);
    }
  };
  return <Button onClick={handleClick}>Create chat</Button>;
};
