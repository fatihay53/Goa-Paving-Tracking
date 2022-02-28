import * as Yup from 'yup';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, FormikProvider, useFormik} from 'formik';
import {Icon} from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import LoginService from "../../../services/LoginService";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const requestUrl = window.location.pathname;
    const loggedIn = localStorage.getItem('loggedin');
    if (requestUrl === '/admin' || requestUrl === '') {
      if (loggedIn === 'true') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, []);

  const loginService = new LoginService();
  const [showPassword, setShowPassword] = useState(false);
  const [wrongLoginEntries, setWrongLoginEntries] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const username = getFieldProps('username').value;
      const password = getFieldProps('password').value;
      loginService.login(username, password).then(
        (response) => {
          if (response.data.auth === 'INCORRECT_USER_INFOS') {
            setWrongLoginEntries(true);
            setSubmitting(false);
          } else {
            localStorage.setItem('loggedin', response.data.session.loggedin);
            localStorage.setItem('role', response.data.session.role);
            localStorage.setItem('user', JSON.stringify(response.data.session.user));
            let signaturePath = localStorage.getItem('signatureConfirmPageRequest');
            if (signaturePath != null && signaturePath != undefined && signaturePath != ""){
              navigate(signaturePath.substr(1,signaturePath.length-1), { replace: true });
            }else{
              navigate(response.data.redirectUrl, { replace: true });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

        {wrongLoginEntries && <p style={{ color: 'red' }}>Wrong credentials please check them.</p>}

        <LoadingButton
          sx={{ mt: 2 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ backgroundColor: '#0F75BD' }}
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
