import type { NextPage } from "next";
import { useState } from "react";

import { trpc } from "../utils/trpc";
import { FiRotateCw } from "react-icons/fi";
import { MessageBar, MessageBox } from "../components/messages";

const Home: NextPage = () => {
  const [ownMessages, setOwnMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const {
    data,
    isLoading: isDataLoading,
    refetch,
  } = trpc.useQuery(["msg.list"]);
  const addMessageMutation = trpc.useMutation(["msg.add"], {
    onSuccess: (addedMessage) => {
      setOwnMessages([...ownMessages, addedMessage.id]);
      refetch();
    },
  });
  const isLoading = isDataLoading || addMessageMutation.isLoading;

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr ">
        <button
          onClick={() => refetch()}
          aria-label="Reload messages"
          className="p-2"
        >
          <FiRotateCw />
        </button>
        <div className="max-h-screen w-full max-w-2xl rounded border border-gray-300 bg-gray-50 sm:w-2/3">
          <div
            id="messageContainer"
            className="m-auto flex h-[80vh] flex-1 flex-col overflow-y-auto landscape:md:h-[60vh] "
          >
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data?.map((msg) => (
                <MessageBox
                  key={msg.id}
                  text={msg.text}
                  createdAt={msg.createdAt}
                  isOwn={ownMessages.includes(msg.id)}
                />
              ))
            )}
          </div>
          <MessageBar
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            onSend={() => {
              if (message) {
                addMessageMutation.mutate({ text: message });
                setMessage("");
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
