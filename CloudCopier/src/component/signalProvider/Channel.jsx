import React from 'react';
import { FaSignal,FaLongArrowAltRight } from 'react-icons/fa';
import img from '../../assets/img/user.png';
import { Link } from 'react-router-dom';

// MUI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Height } from '@mui/icons-material';

const Channel = ( { channel } ) => {
 
  return (
    <>   
    <Card sx={{ maxWidth: 345, borderRadius:3 }} className='cursor-pointer '>
      <CardHeader
        avatar={
          <Avatar src={channel.logo || img} aria-label="recipe" ></Avatar>
        }
        action={
          <Stack direction="row" >
            <Chip label="Risk" color="success" />
          </Stack>
        }

        title={
          <Typography variant="h6" component="h3" style={{ fontWeight: 'bold' }}>
            {channel.channelName}
          </Typography>
        }
        subheader="High achive"
      />
      <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Typography variant="body1" color="text.primary">
            Gain
          </Typography>
          <Typography variant="body2" color="green" style={{ fontWeight: 'bold', alignItems: 'center' }}>
            +12.5%
          </Typography>
        </div>
        <div style={{ flex: 1, margin: '0 10px' }}>
          <Typography variant="body1" color="text.primary">
            Copiers
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', alignItems: 'center' }}>
            510
          </Typography>
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <Typography variant="body1" color="text.primary">
            Commission
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold' }}>
          10%
          </Typography>
        </div>
      </CardContent>
    </Card>
    </>
  )
}

export default Channel