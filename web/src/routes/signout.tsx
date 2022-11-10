import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";

export default function SignOutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      await dispatch(signOut());
      navigate("/", { replace: true });
    })();
  }, [dispatch, navigate]);
  return <></>;
}
