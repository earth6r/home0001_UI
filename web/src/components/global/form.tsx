import React from "react";

const Form = props => {
  const { header, message, agree, name, successPage } = props;
  return (
    <form
      name={`${name ? name : "contact"}`}
      netlify-honeypot="bot-field"
      data-netlify="true"
      method="post"
      action={`/${successPage ? successPage : "thank-you"}`}
    >
      <input type="hidden" name="bot-field" />
      <input
        type="hidden"
        name="form-name"
        value={`${name ? name : "contact"}`}
      />
      <ul className="tableBlock text-left">
        {message && (
          <li className="py-1 px-2 pb-4">
            {header && (
              <span>
                {header}
                <br />
              </span>
            )}
            {message}
          </li>
        )}
        <li>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name*"
            required
          />
        </li>
        <li>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address*"
            required
          />
        </li>
        <li>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Telephone Number*"
            required
          />
        </li>
        <li>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject*"
            required
          />
        </li>
        <li>
          <textarea
            name="message"
            id="message"
            rows="15"
            placeholder="Comment"
          />
        </li>
        {agree && (
          <li>
            <div className="checkbox">
              <input type="checkbox" id="consent" name="consent" required />
              <label for="consent">
                <span>I have read the data protection information</span>
              </label>
            </div>
          </li>
        )}
        <li>
          <button type="submit">Submit</button>
        </li>
      </ul>
    </form>
  );
};

export default Form;
