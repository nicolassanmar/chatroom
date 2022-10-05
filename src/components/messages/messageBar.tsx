import { AiOutlineSend } from "react-icons/ai";

export const MessageBar: React.FC<{
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
          autoComplete="off"
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
