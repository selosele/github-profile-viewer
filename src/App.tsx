import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import './App.css'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Layout.Wrapper />}>
                    <Route index element={<Home />} />
                    <Route path=":userName" element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
