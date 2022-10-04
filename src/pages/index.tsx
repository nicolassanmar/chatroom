import type { NextPage } from "next";
import { useState } from "react";

import { trpc } from "../utils/trpc";
import { FiRotateCw } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";

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

const MessageBox: React.FC<{
  text: string;
  isOwn: boolean;
}> = (props) => {
  return (
    <div className={`flex justify-${props.isOwn ? "start" : "end"}`}>
      <div
        className={`m-2 
      w-fit max-w-xl 
      rounded  px-4 py-2 shadow-md
      bg-${props.isOwn ? "blue-400" : "white"}
      text-${props.isOwn ? "white" : "gray-700"}
      `}
        aria-label="message"
      >
        {props.text}
      </div>
    </div>
  );
};

const MessageBar: React.FC<{
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}> = (props) => {
  return (
    <>
      <form
        className="flex w-full items-center justify-between border-t border-gray-300 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSend();
        }}
      >
        <input
          value={props.value}
          onChange={props.onChange}
          type="text"
          aria-label="Message Input"
          placeholder="Enter Message ..."
          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 text-gray-700 outline-none"
          name="message"
        />
        <button type="button" aria-label="Submit Message">
          <AiOutlineSend className="text-2xl text-gray-700" />
        </button>
      </form>
    </>
  );
};
