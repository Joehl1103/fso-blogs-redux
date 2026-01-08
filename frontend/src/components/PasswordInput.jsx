import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function PasswordInput({ password, setPassword, labelInputClass }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="">
      <div className="flex flex-row ml-">
        <div>
          <label className='' htmlFor="password">Password:</label>
          <input
              data-testid="password"
              type={visible ? "text" : "password"}
              value={password}
              placeholder="password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              className="input ml-15px w-143px"
          />
        </div>
        <span className="p-1 m-0" onClick={() => setVisible(!visible)}>
          {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      </div>
    </div>
  );
}
