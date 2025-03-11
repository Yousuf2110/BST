/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import PinRequest from "layouts/pinRequest";
import ViewPin from "layouts/viewPin";
import ChangePassword from "layouts/changePassword";
import WithdrawHistory from "layouts/withdrawHistory";
import ViewUserPins from "layouts/viewUserPins";
import RewardList from "layouts/rewardList";
import ProductRequest from "layouts/productRequest";
import NewProductRequest from "layouts/newProductRequest";
import AddProduct from "layouts/addProduct";
import NewProductList from "layouts/newProductList";

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
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/withdraw-history",
    component: <WithdrawHistory />,
  },
  // My Tree
  {
    type: "collapse",
    name: "My Tree",
    key: "my-tree",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/my-tree",
    component: <Billing />,
  },
  // Reward List
  {
    type: "collapse",
    name: "Reward List",
    key: "reward-list",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/reward-list",
    component: <RewardList />,
  },
  // Product List
  {
    type: "collapse",
    name: "Product List",
    key: "product-list",
    icon: <Icon fontSize="small">inventory</Icon>,
    route: "/product-list",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Product Requests",
    key: "product-requests",
    icon: <Icon fontSize="small">add_shopping_cart</Icon>,
    route: "/product-requests",
    component: <ProductRequest />,
  },
  // Create Account
  {
    type: "collapse",
    name: "Create Account",
    key: "create-account",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/create-account",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Buy Pin Code",
    key: "buy-pin-code",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/buy-pin-code",
    component: <PinRequest />,
  },
  {
    type: "collapse",
    name: "View Pin Code",
    key: "view-pin-code",
    icon: <Icon fontSize="small">visibility</Icon>,
    route: "/view-pin-code",
    component: <ViewUserPins />,
  },
  {
    type: "collapse",
    name: "Product List",
    key: "product-lists",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    route: "/product-lists",
    component: <NewProductList />,
  },
  {
    type: "collapse",
    name: "Product Requests",
    key: "product-request",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    route: "/product-request",
    component: <NewProductRequest />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "add-product",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    route: "/add-product",
    component: <AddProduct />,
  },
  // Change Password
  {
    type: "collapse",
    name: "Change Password",
    key: "change-password",
    icon: <Icon fontSize="small">lock</Icon>,
    route: "/change-password",
    component: <ChangePassword />,
  },
];

export default routes;
