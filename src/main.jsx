import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routers/Route.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

<QueryClientProvider client={queryClient}>
<div className="max-w-screen-xl mx-auto">
      <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
    </div>
    </QueryClientProvider>

    
  </React.StrictMode>
);
