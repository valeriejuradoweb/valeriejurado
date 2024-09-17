// components/Mailchimp.tsx

"use client"; // This line marks the component as a Client Component

import React, { useState, FormEvent } from "react";

interface MailchimpProps {
  action: string;
  messages?: {
    sending?: string;
    success?: string;
    error?: string;
    empty?: string;
    duplicate?: string;
    button?: string;
  };
  fields: { name: string; type: string; placeholder?: string }[];
  styles?: {
    sendingMsg?: React.CSSProperties;
    successMsg?: React.CSSProperties;
    duplicateMsg?: React.CSSProperties;
    errorMsg?: React.CSSProperties;
  };
  className?: string;
  buttonClassName?: string;
}

const defaultMessages = {
  sending: "Sending...",
  success: "Thank you for subscribing!",
  error: "An unexpected internal error has occurred.",
  empty: "You must write an e-mail.",
  duplicate: "Too many subscribe attempts for this email address",
  button: "Subscribe!",
};

const Mailchimp: React.FC<MailchimpProps> = ({
  action,
  messages = {},
  fields,
  styles,
  className,
  buttonClassName,
}) => {
  const [state, setState] = useState<{ [key: string]: any }>({});
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const values = fields
      .map((field) => `${field.name}=${encodeURIComponent(state[field.name])}`)
      .join("&");
    const url = `${action}?${values}`;
    const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    const email = state["EMAIL"];

    if (!regex.test(email)) {
      setStatus("empty");
      return;
    }

    try {
      setStatus("sending");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: values,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();

      if (result.result === "success") {
        if (result.msg.includes("already subscribed")) {
          setStatus("duplicate");
        } else {
          setStatus("success");
        }
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const mergedMessages = { ...defaultMessages, ...messages };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map((input) => (
        <input
          {...input}
          key={input.name}
          onChange={({ target }) =>
            setState({ ...state, [input.name]: target.value })
          }
          defaultValue={state[input.name]}
        />
      ))}
      <button
        disabled={status === "sending" || status === "success"}
        type="submit"
        className={buttonClassName}
      >
        {mergedMessages.button}
      </button>
      <div className="msg-alert">
        {status === "sending" && (
          <p className="text-blue-600 bg-blue-100 p-2 rounded">
            {mergedMessages.sending}
          </p>
        )}
        {status === "success" && (
          <p className="text-green-600 bg-green-100 p-2 rounded">
            {mergedMessages.success}
          </p>
        )}
        {status === "duplicate" && (
          <p className="text-orange-600 bg-orange-100 p-2 rounded">
            {mergedMessages.duplicate}
          </p>
        )}
        {status === "empty" && (
          <p className="text-yellow-600 bg-yellow-100 p-2 rounded">
            {mergedMessages.empty}
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 bg-red-100 p-2 rounded">
            {mergedMessages.error}
          </p>
        )}
      </div>
    </form>
  );
};

export default Mailchimp;
