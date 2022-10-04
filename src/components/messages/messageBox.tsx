import { timestampDisplay } from "../../utils/timestampDisplay";

export const MessageBox: React.FC<{
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
