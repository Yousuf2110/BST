import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import ViewTree from "layouts/viewTree";
import ResetPassword from "layouts/resetPassword";
import PinRequest from "layouts/pinRequest";
import ChangePassword from "layouts/changePassword";
import ProductList from "layouts/productList";
import RewardList from "layouts/rewardList";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // Withdraw History
  {
    type: "collapse",
    name: "Withdraw History",
    key: "withdraw-history",
    icon: <Icon fontSize="small">wallet</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  // My Tree
  {
    type: "collapse",
    name: "My Tree",
    key: "my-tree",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <ViewTree />,
  },
  // Reward List
  {
    type: "collapse",
    name: "Reward List",
    key: "reward-list",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/notifications",
    component: <RewardList />,
  },
  // Product List
  {
    type: "collapse",
    name: "Product List",
    key: "product-list",
    icon: <Icon fontSize="small">inventory</Icon>,
    route: "/product-list",
    component: <ProductList />,
  },
  // Create Account
  {
    type: "collapse",
    name: "Create Account",
    key: "create-account",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  // Buy Pin Code
  {
    type: "collapse",
    name: "Buy Pin Code",
    key: "buy-pin-code",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/authentication/sign-in",
    component: <PinRequest />,
  },
  // View Pin Code
  {
    type: "collapse",
    name: "View Pin Code",
    key: "view-pin-code",
    icon: <Icon fontSize="small">visibility</Icon>,
    route: "/authentication/sign-in",
    component: <SignUp />,
  },
  // Change Password
  {
    type: "collapse",
    name: "Change Password",
    key: "change-password",
    icon: <Icon fontSize="small">lock</Icon>,
    route: "/sign-up",
    component: <ChangePassword />,
  },
  {
    type: "collapse",
    name: "Reset Password",
    key: "change-password",
    icon: <Icon fontSize="small">lock</Icon>,
    route: "/authentication/sign-up",
    component: <ResetPassword />,
  },
];

export default routes;
