// import React, { useContext } from 'react';
// import { Route, redirect as Redirect} from 'react-router-dom';
// import AuthContext from './Context.jsx';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { user } = useContext(AuthContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 user ? <Component {...props} /> : <Redirect to="/login" />
//             }
//         />
//     );
// };

// export default ProtectedRoute;
