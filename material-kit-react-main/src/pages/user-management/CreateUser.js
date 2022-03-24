import React, {useState} from "react";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import {Box, Container, IconButton, InputAdornment, Stack, styled, TextField} from "@mui/material";
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";
import UserService from "../../services/UserService";
import EmployeeService from "../../services/EmployeeService";
import MenuItem from "@mui/material/MenuItem";

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 960,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}));
export default function CreateUser({isShow,selectedData,setShowSelectedData,findAll}) {
    const userService = new UserService();
    const employeeService = new EmployeeService();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);

    const roles = [{role:"Select",value:''},{role:"ROLE_SUPERVISOR",value:"ROLE_SUPERVISOR"},{role:"ROLE_FOREMAN",value:"ROLE_FOREMAN"},{role:"ROLE_USER",value:"ROLE_USER"},{role:"ROLE_GUEST",value:"ROLE_GUEST"}];

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        userName: Yup.string().required('Username required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        passwordAgain: Yup.string().required('Password again is required'),
        role: Yup.string().required('Role is required')
    });

    const formik = useFormik({
        initialValues: isShow ?
            {
                firstName: selectedData.name,
                lastName: selectedData.surname,
                userName: selectedData.username,
                email: selectedData.email,
                password: selectedData.password,
                passwordAgain: selectedData.password,
                role : selectedData.role,
                hourly_cost: selectedData.hourly_cost
            }
            :{
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            passwordAgain: '',
            role : '',
            hourly_cost:''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
           let password = getFieldProps('password').value;
           let passwordAgain = getFieldProps('passwordAgain').value;
           let firstName = getFieldProps('firstName').value;
           let lastName = getFieldProps('lastName').value;
           let userName = getFieldProps('userName').value;
           let email = getFieldProps('email').value;
           let role = getFieldProps('role').value;

           if (password != passwordAgain){
               formik.setSubmitting(false);
               return toast.warning("Password are not matches!");
           }

           let hourlyCost = getFieldProps('hourly_cost').value;

           if (role === 'ROLE_USER'){
                if (hourlyCost === null || hourlyCost === undefined || hourlyCost === ''){
                    return toast.warning("Please enter hourly cost!");
                }
           }

           userService.findByUserName({userName:userName}).then(res=>{
                if (res.status == 200){
                    if (res.data.length > 0 && !isShow){
                        formik.setSubmitting(false);
                        return toast.warning("Username is already in use!");
                    }else{
                        let user={
                            "userName":userName,
                            "password":password,
                            "role": role
                        }
                        if (!isShow){
                            userService.save({...user}).then(res=>{
                                if (res.status == 200){
                                    formik.setSubmitting(false);
                                    let userId = res.data.insertId;
                                    if (userId != null && userId != '' && userId != undefined){
                                        let type = role === 'ROLE_SUPERVISOR' ? 'SUPERVISOR' : role === 'ROLE_FOREMAN' ? 'FOREMAN' : role === 'ROLE_USER' ? 'EMPLOYEE' : 'GUEST';
                                        let employee = {
                                            firstName : firstName,
                                            lastName : lastName,
                                            email : email,
                                            userId : userId,
                                            employeeType : type,
                                            hourly_cost : hourlyCost
                                        }
                                        employeeService.save({...employee}).then(res=>{
                                            if (res.status == 200) {
                                                formik.setValues(formik.initialValues);
                                                toast.success("Saved succesfully!");
                                            }
                                        })
                                    }
                                }
                            });
                        }else{
                            userService.update({id:selectedData.user_id,...user}).then(res=>{
                                if (res.status == 200){
                                    formik.setSubmitting(false);
                                    let affectedRows = res.data.affectedRows;
                                    if (affectedRows == 1){
                                        let type = role === 'ROLE_SUPERVISOR' ? 'SUPERVISOR' : role === 'ROLE_FOREMAN' ? 'FOREMAN' : role === 'ROLE_USER' ? 'EMPLOYEE' : 'GUEST';
                                        let employee = {
                                            id:selectedData.employee_id,
                                            firstName : firstName,
                                            lastName : lastName,
                                            email : email,
                                            userId : selectedData.user_id,
                                            employeeType : type,
                                            hourly_cost : hourlyCost
                                        }
                                        employeeService.update({...employee}).then(res=>{
                                            if (res.status == 200) {
                                                formik.setValues(formik.initialValues);
                                                toast.success("Update succesfully!");
                                                setShowSelectedData(false);
                                                findAll();
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    }
                }
           })
        }
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    return (
        <Container style={{backgroundColor:'white', paddingTop:'1em'}}>
            <ContentStyle>
                <Box sx={{ mb: 5 }}>
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            fullWidth
                            label="First name"
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />

                        <TextField
                            fullWidth
                            label="Last name"
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Stack>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            fullWidth
                            label="Username"
                            {...getFieldProps('userName')}
                            error={Boolean(touched.userName && errors.userName)}
                            helperText={touched.userName && errors.userName}
                        />
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            {...getFieldProps('role')}
                            error={Boolean(touched.role && errors.role)}
                            helperText={touched.role && errors.role}
                        >
                            {roles.map((option) => (
                                <MenuItem key={option.role} value={option.value}>
                                    {option.role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    {(getFieldProps('role').value==='ROLE_USER'||getFieldProps('role').value==='ROLE_FOREMAN')&&<Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            type="number"
                            fullWidth
                            label="Hourly Cost"
                            {...getFieldProps('hourly_cost')}
                        />
                    </Stack>}
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
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
    );
}