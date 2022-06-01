import { signIn } from "../../shared/utils/services/authServices";
import { useAutoLoaderContext } from "../../ui/AutoLoader/AutoLoaderProvider";

export const Login = () => {
  const { setStatus } = useAutoLoaderContext();

  const init = async () => {
    try {
      setStatus("LOADING");
      const result = await signIn("victor-2000@hotmail.com", "123");
      setStatus("SAVED");
      console.log(result);
    } catch (error) {
      console.log(error);
      setStatus("ERROR");
    }
  };

  return (
    <div>
      <p>Login</p>
      <button onClick={init}>Logeate</button>
    </div>
  );
};
