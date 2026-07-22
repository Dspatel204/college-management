import { u as useAuth, a as useNavigate } from "./router-Dohyv0--.js";
import { c as reactExports } from "./worker-entry-DxW2Qu7l.js";
import "node:events";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
function Index() {
  const {
    isAuthenticated
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({
        to: "/dashboard"
      });
    } else {
      navigate({
        to: "/login"
      });
    }
  }, [isAuthenticated, navigate]);
  return null;
}
export {
  Index as component
};
