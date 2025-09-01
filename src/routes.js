import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Icon from "@mui/material/Icon";
import PinRequest from "layouts/pinRequest";
import ChangePassword from "layouts/changePassword";
import WithdrawHistory from "layouts/withdrawHistory";
import ViewUserPins from "layouts/viewUserPins";
import RewardList from "layouts/rewardList";
import ProductRequest from "layouts/productRequest";
import NewProductRequest from "layouts/newProductRequest";
import AddProduct from "layouts/addProduct";
import NewProductList from "layouts/newProductList";
import Courses from "layouts/courses";
import LeadBoard from "layouts/leaderboard";
import ProductCard from "layouts/ecommerceproducts";
import ECommerceProductRequest from "layouts/ecommerceproductsRequest";

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
    icon: <Icon fontSize="small">history</Icon>,
    route: "/withdraw-history",
    component: <WithdrawHistory />,
  },
  {
    type: "collapse",
    name: "Leader Board",
    key: "leader-board",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/leader-board",
    component: <LeadBoard />,
  },
  // My Tree
  {
    type: "collapse",
    name: "My Tree",
    key: "my-tree",
    icon: <Icon fontSize="small">account_tree</Icon>,
    route: "/my-tree",
    component: <Billing />,
  },
  // Reward List
  {
    type: "collapse",
    name: "Reward List",
    key: "reward-list",
    icon: <Icon fontSize="small">redeem</Icon>,
    route: "/reward-list",
    component: <RewardList />,
  },
  // Courses
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/courses",
    component: <Courses />,
  },
  // Product List
  {
    type: "collapse",
    name: "Product List",
    key: "product-list",
    icon: <Icon fontSize="small">inventory_2</Icon>,
    route: "/product-list",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Product Requests",
    key: "product-requests",
    icon: <Icon fontSize="small">shopping_cart_checkout</Icon>,
    route: "/product-requests",
    component: <ProductRequest />,
  },
  // Create Account
  {
    type: "collapse",
    name: "Create Account",
    key: "create-account",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/create-account",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Buy Pin Code",
    key: "buy-pin-code",
    icon: <Icon fontSize="small">pin</Icon>,
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
    name: "Product Requests",
    key: "product-request",
    icon: <Icon fontSize="small">request_quote</Icon>,
    route: "/product-request",
    component: <NewProductRequest />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "add-product",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/add-product",
    component: <AddProduct />,
  },
  {
    type: "collapse",
    name: "Change Password",
    key: "change-password",
    icon: <Icon fontSize="small">password</Icon>,
    route: "/change-password",
    component: <ChangePassword />,
  },
  {
    type: "collapse",
    name: "E-Commerce",
    key: "e-commerce",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/e-commerce",
    component: <ProductCard />,
  },
  {
    type: "collapse",
    name: "Request E-Commerce",
    key: "request-e-commerce",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/request-e-commerce",
    component: <ECommerceProductRequest />,
  },
];

export default routes;
