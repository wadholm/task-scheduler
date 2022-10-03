/* eslint-disable no-undef */
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {

  return (
    <>
        <style type="text/css">
      {`
  .btn-primary {
    background-color: #4643f8;
    --bs-btn-border-color: #4643f8;
    --bs-btn-hover-bg: #0000f9;
    color: white;
  }
  .btn-outline-primary {
    --bs-btn-border-color: #4643f8;
    --bs-btn-hover-bg: #4643f8;
    --bs-btn-hover-border-color: #4643f8;
    color: #4643f8;
  }
  .btn-secondary {
    background-color: #7c98f5;
    --bs-btn-border-color: #7c98f5;
    --bs-btn-hover-bg: #4643f8;
    --bs-btn-hover-border-color: #4643f8;
    color: #fff;
}
.btn-outline-secondary {
  --bs-btn-border-color: #7c98f5;
  --bs-btn-hover-bg: #4643f8;
  --bs-btn-hover-border-color: #4643f8;
  color: #7c98f5;
}
.btn-danger {
  background-color: #FE7062;
  --bs-btn-border-color: #FE7062;
  --bs-btn-hover-bg: #E44E4D;
  --bs-btn-hover-border-color: #E44E4D;
  color: white;
}
.btn-outline-danger {
  --bs-btn-border-color: #FE7062;
  --bs-btn-hover-bg: #E44E4D;
  --bs-btn-hover-border-color: #E44E4D;
  color: #FE7062;
}
.alert-secondary {
  --bs-alert-color: #41464b;
  --bs-alert-bg: #e6ebfe;
  --bs-alert-border-color: #bdcffc;
}
  `}
    </style>
      <div className="App">
        <Navigation />
      </div>
      <Footer />
    </>
  );
};

export default App;

