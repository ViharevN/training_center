import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FC } from 'react';

interface IPopoverProps {
    buttonValue: string
    info: string
}

const PopoverElement: FC<IPopoverProps> = ({info, buttonValue}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'popover' : undefined;

  return (
    <>
      <Button aria-describedby={id} variant="text" onClick={handleClickPopover}
      sx={{color: 'text.secondary', border:1, borderRadius:'100%', borderColor: 'grey.500', p:0, ml:1, minWidth:'27px'}}>
        {buttonValue}
      </Button>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, maxWidth:'950px' }}>{info}</Typography>
      </Popover>
    </>
  );
}

export default PopoverElement