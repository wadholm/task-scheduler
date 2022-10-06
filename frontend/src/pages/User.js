/* eslint-disable no-undef */
import React from "react";
// import Axios from "axios";
import Container from "react-bootstrap/Container";

const User = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     Axios({
//       method: "GET",
//       url: `${process.env.REACT_APP_ENDPOINT}/users/${process.env.REACT_APP_TEST_USER}`,
//     })
//       .then((res) => {
//         setData(res.data.user);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
// }, []);

  return (
    <>
    <Container className="p-3 grid wrapper">
    <div className="header-wrapper">
    <h1 className="header">User details</h1>
    <p>Functionality is under construction. </p>
    </div>
    </Container>
    </>
  );
};

export default User;
