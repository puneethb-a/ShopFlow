import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome' 
import Signup from './pages/Signup' 
import Signin from './pages/Signin' 
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import Addproduct from './pages/Addproduct';
import Updateproduct from './pages/UpdateProduct';
import ViewCart from './pages/ViewCart';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/sign_up_page' element={<Signup />} />
          <Route path='/sign_in_page' element={<Signin />} />
          <Route path='/admin_page' element={<Admin />} />
          <Route path='/customer_page' element={<Customer />} />
          <Route path='/add_prod_page' element={<Addproduct />} />
          <Route path='/update_prod_page' element={<Updateproduct />} />
          <Route path='/view_cart_page' element={<ViewCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;