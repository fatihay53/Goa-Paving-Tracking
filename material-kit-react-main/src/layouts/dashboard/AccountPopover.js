import {Icon} from '@iconify/react';
import {useRef, useState} from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import passwordFill from '@iconify/icons-eva/lock-fill';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {alpha} from '@mui/material/styles';
import {Avatar, Box, Button, Divider, IconButton, MenuItem, Typography} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: homeFill,
        linkTo: '/dashboard'
    }  ,
    {
        label: 'Change Password',
        icon: passwordFill,
        linkTo: '/dashboard/usermanagement/changePassword'
    }/*,
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  } */
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        localStorage.clear();
        navigate('/admin', { replace: true });
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                        }
                    })
                }}
            >
                <Avatar src={account.photoURL} alt="photoURL" />
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 220 }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle1" noWrap>
                        {user?.name?.toUpperCase()} {user?.surname?.toUpperCase()}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        to={option.linkTo}
                        component={RouterLink}
                        onClick={handleClose}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <Box
                            component={Icon}
                            icon={option.icon}
                            sx={{
                                mr: 2,
                                width: 24,
                                height: 24
                            }}
                        />

                        {option.label}
                    </MenuItem>
                ))}

                <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button fullWidth color="inherit" variant="outlined" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </MenuPopover>
        </>
    );
}
