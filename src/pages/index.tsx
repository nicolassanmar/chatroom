import type { NextPage } from "next";
import { useState } from "react";

import { trpc } from "../utils/trpc";
import { FiRotateCw } from "react-icons/fi";
import { MessageBar, MessageBox } from "../components/messages";

const Home: NextPage = () => {
  const [ownMessages, setOwnMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const utils = trpc.useContext();
  const { data, isLoading: isDataLoading } = trpc.useQuery(["msg.list"]);
  const addMessageMutation = trpc.useMutation(["msg.add"], {
    onSuccess: (addedMessage) => {
      setOwnMessages([...ownMessages, addedMessage.id]);
      utils.invalidateQueries(["msg.list"]);
    },
  });

  const isLoading = isDataLoading || addMessageMutation.isLoading;

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-tr md:h-screen ">
        <button
          onClick={() => utils.invalidateQueries(["msg.list"])}
          aria-label="Reload messages"
          className="p-2"
        >
          <FiRotateCw />
        </button>
        <div className="max-h-full w-full max-w-2xl rounded border border-gray-300 bg-gray-50 sm:w-2/3">
          <div
            id="messageContainer"
            // column-reverse is used to make the scrollbar begin at the bottom
            className="m-auto flex h-[80vh] flex-1  flex-col-reverse overflow-y-auto landscape:md:h-[60vh]"
          >
            <div>
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
