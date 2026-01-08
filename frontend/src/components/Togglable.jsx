import { useState } from "react";

const Togglable = ({ buttonLabel, cancelLabel, children }) => {
  const [visible, setVisible] = useState(false);

  // if visible is true then set display to none
  const hideWhenVisible = { display: visible ? "none" : "" };
  // if visible is true then set display to yes
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="ml-2 m-0">
      <div style={hideWhenVisible}>
        <button
          data-testid="toggle-on-button"
          className="btn"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </button>
      </div>
      <div className="details" style={showWhenVisible}>
        {children}
        <button className="btn" onClick={toggleVisibility}>
          {cancelLabel}
        </button>
      </div>
    </div>
  );
};

export default Togglable;
