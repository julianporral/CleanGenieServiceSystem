import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/common/header/Header";
import "./App.css";
import About from "./components/about/About";
import Gallery from "./components/gallery/Gallery";
import Services from "./components/services/Services";
import Contacts from "./components/about/AboutInfo/Background/Contacts";
import Background from "./components/about/AboutInfo/Contactss/Background";
import Certificate from "./components/about/AboutInfo/Certificates/Certificate";
import Info from "./components/MoreInfo/Info";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/services" component={Services}/>
       
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/contacts" component={Contacts} /> 
        <Route exact path="/background" component={Background} />
        <Route exact path="/certificate" component={Certificate} /> 
        <Route exat path="/info" component={Info}
/>
        

        

      </Switch>
    </Router>
  );
};

export default App;
