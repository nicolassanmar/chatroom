import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr ">
        {/* <button >Reload</button> */}
        <div className="max-h-screen max-w-2xl rounded border border-gray-300 bg-gray-50">
          <div
            id="messageContainer"
            className="m-auto flex h-[80vh] flex-1 flex-col overflow-y-auto "
          >
            <MessageBox text="Hello" isOwn={true} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox text="Hello" isOwn={false} />
            <MessageBox
              text="Lorem ipsum dolor sit amet, consectetur adipis elit. Quisquam, quod. Lorem ipsum dolor sit amet, consectetur adip "
              isOwn={true}
            />
            <MessageBox
              text="Lorem ipsum dolor sit amet, consectetur adipis"
              isOwn={false}
            />
          </div>
          <MessageBar />
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

const MessageBar: React.FC = (props) => {
  return (
    <>
      <div className="flex w-full items-center justify-between border-t border-gray-300 p-3">
        <input
          type="text"
          aria-label="Message Input"
          placeholder="Enter Message ..."
          className="mx-3 block w-full rounded-full bg-gray-100 py-2 pl-4 text-gray-700 outline-none"
          name="message"
        />
        <button type="submit" aria-label="Submit Message">
          <svg
            className="h-5 w-5 origin-center rotate-90 transform text-gray-500"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};
