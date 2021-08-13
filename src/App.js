import React , { Suspense, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router , Switch , Route, useHistory, Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import Header from './Component/User/Header/Header';
import Footer from './Component/User/Footer/Footer';
import NotFound from './Component/User/Notfound/Notfound';
import pageUser from './Page/User/User';
import pageAdmin from './Page/Admin/Admin'
import Logout from './Component/Logout/Logout';
import Loading from './Component/Loading/Loading';
import Comment from './Component/Comment/Comment';
import { useSelector } from 'react-redux';

function App() {

  const token = useSelector(state => state.token)
  const isAdmin = useSelector(state => state.isAdmin);
  const history = useHistory();
  const renderPage = (page)=>{
    if(page.length > 0){
      return page.map(( value, index )=>{
        return (
          <Route
          key={index}
          path={value.path}
          exact={value.exact}
          component={value.component}
        >
        </Route>
        )
      })
    }
  }
  const renderPageAdmin = (page)=>{
    if(page.length > 0){
      return page.map(( value, index )=>{
        return (
          <Route
          key={index}
          path={value.path}
          exact={value.exact}
          component={value.component}
        >
        </Route>
        )
      })
    }
  }
  return (
      <Router>
        <Layout className="layout">
            <Header/>
               <Suspense fallback={Loading}>
                  <Switch>
                         {/* {(isAdmin && token) ? <Redirect to="/admin" /> : null} */}
                         {(isAdmin && token) ? renderPage(pageAdmin) :  renderPage(pageUser)}
                         {/* <Route path="/" render={()=>"hello"}></Route> */}
                         <Route path="/binh-luan" exact component={Comment}></Route>   
                         <Route path="/dang-xuat" exact component={Logout}></Route>   
                         <Route component={NotFound}></Route>   
                    </Switch>
                </Suspense>
            <Footer/>
        </Layout>
    </Router>
  );
}

export default App;
