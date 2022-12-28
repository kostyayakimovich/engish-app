import React, { memo, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, CircularProgress } from "@mui/material";
import Logo from "../../assets/images/Logo.svg";
import { RootState } from "../../store/store";
import { InitialValuesLogin } from "../../store/models/login.model";
import { authorizationActions } from "../../store/actions/authorizationActions";
import "./style.scss";

const theme = createTheme();

const validationSchema = yup.object({
 email: yup
  .string()
  .trim()
  .email("Enter a valid email")
  .required("Email is required"),
 password: yup
  .string()
  .trim()
  .min(4, "Password should be of minimum 4 characters length")
  .required("Password is required"),
});

const Login: React.FunctionComponent = memo(() => {
 const [isRegister, setIsRegister] = useState(false);
 const [isSendToEmail, setIsSendtoEmail] = useState(false);

 const dispatch = useDispatch();
 const { isLoading, errorServer, registerParams } = useSelector(
  (state: RootState) => state.authorization
 );

 useEffect(() => setIsSendtoEmail(!!registerParams), [registerParams]);

 const initialValues = {
  email: "",
  password: "",
 };

 const formik = useFormik({
  initialValues: initialValues,
  validationSchema: validationSchema,
  onSubmit: (values: InitialValuesLogin) => {
   !isRegister
    ? dispatch(
       authorizationActions.logIn({
        email: values.email,
        password: values.password,
       })
      )
    : dispatch(
       authorizationActions.register({
        email: values.email,
        password: values.password,
       })
      );
  },
 });

 return (
  <div className="login">
   <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
     <CssBaseline />
     <Box
      sx={{
       marginTop: 8,
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
      }}
     >
      <img src={Logo} alt="logo" className="logo" />

      <form onSubmit={formik.handleSubmit}>
       <Box
        sx={{
         width: 400,
         minWidth: 300,
         marginTop: 4,
         gap: 2,
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
        }}
       >
        {errorServer && <Alert severity="error">{errorServer}</Alert>}
        {isSendToEmail && (
         <Alert severity="success">Link has been sent by email</Alert>
        )}
        <TextField
         fullWidth
         id="email"
         name="email"
         label="Email"
         value={formik.values.email}
         onChange={formik.handleChange}
         error={formik.touched.email && Boolean(formik.errors.email)}
         helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
         fullWidth
         id="password"
         name="password"
         label="Password"
         type="password"
         value={formik.values.password}
         onChange={formik.handleChange}
         error={formik.touched.password && Boolean(formik.errors.password)}
         helperText={formik.touched.password && formik.errors.password}
        />
        {!isRegister ? (
         <Button color="primary" variant="contained" fullWidth type="submit">
          {isLoading ? <CircularProgress /> : "Login"}
         </Button>
        ) : (
         <Button color="primary" variant="contained" fullWidth type="submit">
          {isLoading ? <CircularProgress /> : "Registration"}
         </Button>
        )}
        <div className="login__link" onClick={() => setIsRegister(!isRegister)}>
         {!isRegister ? "registration?" : "log in?"}
        </div>
       </Box>
      </form>
     </Box>
    </Container>
   </ThemeProvider>
  </div>
 );
});

export default Login;
