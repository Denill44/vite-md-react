import { Home } from "./Home/Home";
import { Titles } from "./Titles/Titles";
import { Title } from "./Title/Title";
import { Layout } from "../layout";
import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";


export const pages = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="titles" element={<Titles />} />
        <Route path="titles/:titleId" element={<Title />} />
      </Route>
    </>
  )
)