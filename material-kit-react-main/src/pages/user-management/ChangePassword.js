import {Box, Container, IconButton, InputAdornment, Stack, styled, TextField} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import {Icon} from "@iconify/react/dist/iconify";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import UserService from "../../services/UserService";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 960,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}));

export default function ChangePassword({isShow,selectedData,setShowSelectedData,findAll}){

    const userService = new UserService();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const navigate = useNavigate();

    const RegisterSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        password: Yup.string().required('Password is required'),
        passwordAgain: Yup.string().required('Password again is required'),
    });

    const formik = useFormik({
        initialValues: isShow ?
            {
                oldPassword: selectedData.oldPassword,
                password: selectedData.password,
                passwordAgain: selectedData.password
            }
            :{
                oldPassword: '',
                password: '',
                passwordAgain: ''
            },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            let oldPassword = getFieldProps('oldPassword').value;
            let password = getFieldProps('password').value;
            let passwordAgain = getFieldProps('passwordAgain').value;

            if (password != passwordAgain){
                formik.setSubmitting(false);
                return toast.warning("Password are not matches!");
            }
            let userName = JSON.parse(localStorage.getItem('user'))?.username;
            userService.findByUserName({userName}).then(res=>{
                if (res.status == 200){
                    if (res.data.length > 0 && !isShow){
                        if (oldPassword !== res.data[0].password){
                            formik.setSubmitting(false);
                            return toast.warning("Old password is wrong!");
                        }else{
                            let user={
                                "userName":userName,
                                "password":password
                            }
                            userService.changePassword({...user}).then(res=>{
                                if (res.status == 200){
                                    formik.setSubmitting(false);
                                    formik.setValues(formik.initialValues);
                                    toast.success("Password changed!");
                                    localStorage.clear();
                                    navigate('/admin', { replace: true });
                                }
                            });
                        }
                    }
                }
            })
        }
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    return(
        <Container style={{backgroundColor:'white', paddingTop:'1em'}}>
            <ContentStyle>
                <Box sx={{ mb: 5 }}>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    autoComplete="current-password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Old Password"
                                    {...getFieldProps('oldPassword')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                                    <Icon icon={showPassword ? eyeFill : eyeOffFill}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                                    helperText={touched.oldPassword && errors.oldPassword}
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
                                                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                                    <Icon icon={showPassword ? eyeFill : eyeOffFill}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <TextField
                                    fullWidth
                                    autoComplete="current-password"
                                    type={showPasswordAgain ? 'text' : 'password'}
                                    label="Password Again"
                                    {...getFieldProps('passwordAgain')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={() => setShowPasswordAgain((prev) => !prev)}>
                                                    <Icon icon={showPasswordAgain ? eyeFill : eyeOffFill}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    error={Boolean(touched.passwordAgain && errors.passwordAgain)}
                                    helperText={touched.passwordAgain && errors.passwordAgain}
                                />

                                <LoadingButton
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Submit
                                </LoadingButton>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Box>
            </ContentStyle>
        </Container>
    )
}