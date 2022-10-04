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

const MessageBox: React.FC<{
  text: string;
  createdAt: Date;
  isOwn: boolean;
}> = (props) => {
  return (
    <div className={`flex justify-${props.isOwn ? "start" : "end"}`}>
      <div className={`flex flex-col items-${props.isOwn ? "start" : "end"}`}>
        <div
          className={`m-2 
        w-fit max-w-xl 
        rounded px-4  py-2 shadow-md
        bg-${props.isOwn ? "blue-400" : "white"}
        text-${props.isOwn ? "white" : "gray-700"}
        `}
          aria-label="message"
        >
          {props.text}
        </div>
        <p className="px-4 text-sm text-gray-400">
          {timestampDisplay(props.createdAt)}
        </p>
      </div>
    </div>
  );
};

const timestampDisplay = (dateTime: Date): string => {
  const formatter = new Intl.RelativeTimeFormat("en", {});
  const now = new Date();
  const diff = now.getTime() - dateTime.getTime();

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;

  const intervals: {
    greaterThan: number;
    divisor: number;
    unit: Intl.RelativeTimeFormatUnit;
  }[] = [
    { greaterThan: HOUR, divisor: HOUR, unit: "hour" },
    { greaterThan: MINUTE, divisor: MINUTE, unit: "minute" },
    { greaterThan: 30 * SECOND, divisor: SECOND, unit: "seconds" },
  ];

  if (diff <= 24 * HOUR) {
    for (const interval of intervals) {
      if (diff >= interval.greaterThan) {
        const x = Math.round(Math.abs(diff) / interval.divisor);
        return formatter.format(-x, interval.unit);
      }
    }
  }

  // More than a day ago
  return dateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h12",
    minute: "numeric",
  });
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
        <button
          className=" disabled:opacity-20"
          type="submit"
          aria-label="Submit Message"
          disabled={props.value === ""}
        >
          <AiOutlineSend className="text-2xl text-gray-700" />
        </button>
      </form>
    </>
  );
};
