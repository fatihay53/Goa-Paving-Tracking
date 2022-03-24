import PropTypes from 'prop-types';
import {useRef, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Icon} from '@iconify/react';
import browserFill from '@iconify/icons-eva/browser-fill';
// material
import {alpha} from '@mui/material/styles';
import {Badge, Divider, IconButton, List, ListItemButton, ListItemText, ListSubheader, Typography} from '@mui/material';
// utils
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
    {
        title: 'Covid Form',
        link: 'https://form.jotform.com/Tyler_Pace_tylerpace/covid-19-form'
    },
    {
        title: 'Health Safety Policy',
        link: 'https://github.com/fatihay53/fatihay53/files/8306659/Health.Safety.Policy.pdf'
    },
    {
        title: 'Credit Card Form',
        link: 'https://form.jotform.com/Tyler_Pace_tylerpace/creditcardcharge'
    }
];

function renderContent(notification) {
    const title = (
        <Typography variant="subtitle2" onClick={() => window.open(notification.link)}>
            {notification.title}
        </Typography>
    );

    return {
        title
    };
}

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
};

function NotificationItem({notification}) {
    const {link, title} = renderContent(notification);

    return (
        <ListItemButton
            to="#"
            disableGutters
            component={RouterLink}
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px'
            }}
        >

            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled'
                        }}
                    ></Typography>
                }
            />
        </ListItemButton>
    );
}

export default function NotificationsPopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                size="large"
                color={open ? 'primary' : 'default'}
                onClick={handleOpen}
                sx={{
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
                    })
                }}
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Icon icon={browserFill} width={20} height={20}/>
                </Badge>
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{width: 360}}
            >
                <Divider/>

                <Scrollbar sx={{height: {xs: 340, sm: 'auto'}}}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{py: 1, px: 2.5, typography: 'overline'}}>
                                Redirects
                            </ListSubheader>
                        }
                    >
                        {notifications.slice(0, 3).map((notification) => (
                            <NotificationItem notification={notification}/>
                        ))}
                    </List>
                </Scrollbar>
            </MenuPopover>
        </>
    );
}
