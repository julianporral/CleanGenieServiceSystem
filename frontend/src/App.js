import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from './components/common/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import Services from './components/services/Services';
import Contacts from './components/about/AboutInfo/Background/Contacts';
import Background from './components/about/AboutInfo/Contactss/Background';
import Certificate from './components/about/AboutInfo/Certificates/Certificate';
import Info from './components/MoreInfo/Info';
import UserLandingPage from './components/LoggInLandingPage.js/UserLandingPage';
import UserHeader from './components/LoggInLandingPage.js/UserHeader';
import BookingPage from './components/LoggInLandingPage.js/Calendar&UserAccount/BookingPage';
import AdminPage from './components/LoggInLandingPage.js/AdminSide/AdminPage';
import Screenshot from './components/LoggInLandingPage.js/inquiry/Payment/Screenshot';
import Inquiry from './components/LoggInLandingPage.js/inquiry/Inquiry';
import Register from './components/GoogleSignin/Register';
import Login from './components/GoogleSignin/Login';
import CustomerInquiry from './components/LoggInLandingPage.js/AdminSide/CustomerInquiry/CustomerInquiry';
import './App.css';
import AdminCalendar from './components/LoggInLandingPage.js/AdminSide/AdminCalendar/AdminCalendar';
import ImageEdit from './components/LoggInLandingPage.js/AdminSide/ImageEdit/ImageEdit';
import AdminFinanceData from './components/LoggInLandingPage.js/AdminSide/finance/AdminFinanceData';
import MaterialData from './components/LoggInLandingPage.js/AdminSide/MaterialData/MaterialData';
import ServiceEdit from './components/LoggInLandingPage.js/AdminSide/ServicesEdit/ServiceEdit';
import UserAccounts from './components/LoggInLandingPage.js/AdminSide/UserAccounts/UserAccounts';
import EditBookingForm from './components/LoggInLandingPage.js/AdminSide/CustomerBookingForm/EditBookingForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authListener = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => authListener();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/userlandingpage">
          <UserHeader />
          <UserLandingPage />
        </Route>
        <Route path="/booking" component={BookingPage} />
        <Route path="/screenshot" component={Screenshot} />
        <Route exact path="/inquiry" component={Inquiry}/> 
        {/**Admin  */}
        <Route exact path="/admin" component={AdminPage} />
        <Route path="/customerinquiry" component={CustomerInquiry}/>
        <Route path="/admincalendar" component={AdminCalendar} /> 
        <Route path="/galleryedit" component={ImageEdit}/>
        <Route path="/editbookingform" component={EditBookingForm}/> 
        <Route path="/adminfinancedata" component={AdminFinanceData}/>
        <Route path="/serviceedit" component={ServiceEdit}/>
        <Route path="/materialdata" component={MaterialData}/>
        <Route path="/useraccounts" component={UserAccounts}/> 
        <Route>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/background" component={Background} />
            <Route exact path="/certificate" component={Certificate} />
            <Route exact path="/info" component={Info} />
            <Redirect to="/" />
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
