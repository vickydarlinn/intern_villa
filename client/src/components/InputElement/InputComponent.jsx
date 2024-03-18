import React from "react";

const InputComponent = ({
  type,
  placeholder,
  coins,
  value,
  handler,
  onSave,
  name,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col w-1/2">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handler}
          required
          className="bg-transparent border border-gray-600 rounded-md p-2 outline-none"
        />
        <span className="text-gray-400 text-xs pl-2">
          {coins} {coins > 1 ? "coins" : "coin"}
        </span>
      </div>

      <button
        onClick={() => onSave(name, value, coins)}
        className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg"
      >
        Save
      </button>
    </div>
  );
};

export default InputComponent;
