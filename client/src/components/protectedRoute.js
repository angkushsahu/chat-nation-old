"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const state_1 = require("../state");
const utils_1 = require("../utils");
const ProtectedRoute = ({ children }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { setUser } = (0, state_1.ChatState)();
    (0, react_1.useEffect)(() => {
        (0, utils_1.getRequest)("/user")
            .then(res => {
            if (res === null || res === void 0 ? void 0 : res.success) {
                setUser(res.user);
                navigate("/", { replace: true });
            }
            else {
                setUser({});
                navigate("/login", { replace: true });
            }
        })
            .catch(err => {
            setUser({});
            navigate("/login", { replace: true });
        });
    }, [navigate]);
    return <>{children}</>;
};
exports.default = ProtectedRoute;
