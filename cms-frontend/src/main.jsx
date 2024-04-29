import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Blog } from "./views/client/Blog";
import { Layout as LayoutClient } from "./components/client/Layout/Layout";
import { Layout as LayoutAdmin } from "./components/admin/Layout/Layout";
import { Login } from "./views/admin/Login";
import { Registration } from "./views/admin/Registration";
import { registrationPageLoader } from "./api/registrationPageLoader";
import { ForgotPassword } from "./views/admin/ForgotPassword";
import { ResetPassword } from "./views/admin/ResetPassword";
import { resetPasswordPageLoader } from "./api/resetPasswordLoader";

import { Home as HomeAdmin } from "./views/admin/Home";
import { Posts } from "./views/admin/Posts/Posts";
import { AddPost } from "./views/admin/Posts/AddPost";
import { Pages } from "./views/admin/Pages/Pages";
import { AddPage } from "./views/admin/Pages/AddPage";
import { homePageLoader } from "./api/homePageLoader";
import { pagesLoader } from "./api/pagesLoader";
import { EditPage } from "./views/admin/Pages/EditPage";
import { pageLoader } from "./api/pageLoader";
import { Users } from "./views/admin/Users/Users";
import { usersLoader } from "./api/usersLoader";
import { AddUser } from "./views/admin/Users/AddUser";
import { Profile } from "./views/admin/Profile";
import { profileLoader } from "./api/profile.loader";
import { Categories } from "./views/admin/Categories/Categories";
import { categoriesLoader } from "./api/categories.loader";
import { AddCategory } from "./views/admin/Categories/AddCategory";
import { ProtectedRoute } from "./views/admin/ProtectedRoute";
import { Page } from "./views/client/Page";
import { Settings } from "./views/admin/Settings";
import { settingsLoader } from "./api/settings.loader";
import { Post } from "./views/client/Post";
import {
  categoryPostsLoader,
  postLoader,
  postsLoader,
} from "./api/posts.loader";
import { EditPost } from "./views/admin/Posts/EditPost";
import { Search } from "./views/client/Search";
import { searchLoader } from "./api/search.loader";
import { Category } from "./views/client/Category";
import { MenuBuilder } from "./components/admin/MenuBuilder/MenuBuilder";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
    loader: registrationPageLoader,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    loader: resetPasswordPageLoader,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <HomeAdmin />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "posts",
        element: <Posts />,
        loader: postsLoader,
      },
      {
        path: "posts/:idOrSlug",
        element: <EditPost />,
        loader: postLoader,
      },
      {
        path: "add-post",
        element: <AddPost />,
        loader: categoriesLoader,
      },
      { path: "users", element: <Users />, loader: usersLoader },
      { path: "add-user", element: <AddUser /> },
      {
        path: "pages",
        element: <Pages />,
        loader: pagesLoader,
      },
      {
        path: "pages/:id",
        element: <EditPage />,
        loader: pageLoader,
      },
      {
        path: "add-page",
        element: <AddPage />,
      },
      {
        path: "categories",
        element: <Categories />,
        loader: categoriesLoader,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "settings",
        element: <Settings />,
        loader: settingsLoader,
      },
      {
        path: "menu",
        element: <MenuBuilder />,
      },
    ],
  },
  {
    path: "",
    element: <LayoutClient />,
    loader: settingsLoader,
    children: [
      {
        path: "/",
        element: <Page />,
        loader: homePageLoader,
      },
      {
        path: "/blog",
        element: <Blog />,
        loader: postsLoader,
      },
      {
        path: "/blog/:idOrSlug",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "/category/:categoryId",
        element: <Category />,
        loader: categoryPostsLoader,
      },
      {
        path: "/pages/:id",
        element: <Page />,
        loader: pageLoader,
      },
      {
        path: "/search/:query",
        element: <Search />,
        loader: searchLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
