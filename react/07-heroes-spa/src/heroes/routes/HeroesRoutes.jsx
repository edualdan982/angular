import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages"

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <Routes>
          <Route path="marvel" element={<MarvelPage />}></Route>
          <Route path="dc" element={<DcPage />}></Route>
          {/*Falta los compenentes de buscar, buscar heroe por id  */}
          <Route path="search" element={<SearchPage />}></Route>
          <Route path="hero/:id" element={<HeroPage />}></Route>
          <Route path="/" element={<Navigate to="/marvel" />} />
        </Routes>
      </div>
    </>
  )
}
