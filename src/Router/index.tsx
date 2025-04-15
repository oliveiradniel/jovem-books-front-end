import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

import Home from '../pages/nonPrivateRoutes/Home';
import SignIn from '../pages/nonPrivateRoutes/SignIn';
import SignUp from '../pages/nonPrivateRoutes/SignUp';

import Layout from '../pages/privateRoutes/components/Layout';
import Dashboard from '../pages/privateRoutes/Dashboard';
import MyBooks from '../pages/privateRoutes/MyBooks';
import GoogleBooks from '../pages/privateRoutes/GoogleBooks';
import Book from '../pages/privateRoutes/Book';
import EditBook from '../pages/privateRoutes/EditBook';
import NewBook from '../pages/privateRoutes/NewBook';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route index path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<Layout />}>
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route path="/new-book" element={<NewBook />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/google-books" element={<GoogleBooks />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/book/edit/:id" element={<EditBook />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
