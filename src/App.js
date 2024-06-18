import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layout/default';
import { Fragment } from 'react';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.element;
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            }
            else if (route.layout === null) {
              Layout = Fragment
            }
            return <Route key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              } />
          })}
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route, index) => {
              const Page = route.element;
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              }
              else if (route.layout === null) {
                Layout = Fragment
              }
              return <Route key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
            })}
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}