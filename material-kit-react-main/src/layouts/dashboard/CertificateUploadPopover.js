import {useRef, useState} from 'react';
import {Icon} from '@iconify/react';
import uploadFill from '@iconify/icons-eva/upload-fill';
import {alpha} from '@mui/material/styles';
import {Badge, IconButton, Typography} from '@mui/material';
import {useNavigate} from "react-router";

export default function CertificateUploadPopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true);
    };

    const openUpload=()=>{
        handleOpen();
        navigate('uploadCertificate',{replace:true})
    }

    return (
        <>
            <IconButton
                ref={anchorRef}
                size="large"
                color={open ? 'primary' : 'default'}
                onClick={openUpload}
                sx={{
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
                    })
                }}
            >
                <Badge color="error">
                    <Icon icon={uploadFill} width={20} height={20}/>
                </Badge>
            </IconButton>

        </>
    );
}
