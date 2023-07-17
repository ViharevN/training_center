import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useCopyToClipboard } from 'usehooks-ts'
import { FC } from 'react';

interface IPropsLink {
    link: string;
}

export const LinkToCourse: FC<IPropsLink> = ({ link }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [value, copy] = useCopyToClipboard()
    const [copyed, setCopyed] = React.useState(false)

    const copyLink = () => {
        copy(link)
        setCopyed(true)
        setTimeout(() => {
            setCopyed(false)
            copy(link)
        }, 2000)
    }
    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <button onClick={copyLink} className='mt-2'>
                    Ссылка на курс: <span className='hover:text-[#719EFC]'>{link}</span> 
                </button>
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none'
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {copyed ? <Typography sx={{ p: 1 }}>Ccылка скопирована</Typography> : <Typography sx={{ p: 1 }}>Нажмите, чтобы скопировать ссылку</Typography>}
            </Popover>
        </div>
    );
}