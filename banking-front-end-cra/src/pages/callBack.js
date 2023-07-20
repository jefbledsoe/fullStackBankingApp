import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context";
import { useContext, useEffect } from "react";

function CallBack() {
  const navigate = useNavigate();
  const { setCurrentPath } = useContext(UserContext);

  const { isloggedIn } = useContext(UserContext);

  useEffect(() => {
    setCurrentPath("/callBack/");
  }, []);

  return (
    <div className="container">
      <div id="callback-message"></div>
      <div id="callback-image"></div>
    </div>
  );
}
export default CallBack;
