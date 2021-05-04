import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function mobaLink(nick) {
  return `https://app.mobalytics.gg/lol/profile/euw/${nick}/overview`;
}

function opggLink(nick) {
  return `https://euw.op.gg/summoner/userName=${nick}`;
}

const renderPlayer = (player) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar variant="square">
          <img height="40px" src={`/images/champion/${player?.champ?.img}`} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography>
          {player.summonerName}
          {" "}
          <Link target="_blank" href={opggLink(player.summonerName)}>
            OP.GG
          </Link>
          {" "}
          <Link target="_blank" href={mobaLink(player.summonerName)}>
            Mobalytics
          </Link>
        </Typography>
      </ListItemText>
    </ListItem>
  )
}

const renderBan = (champ) => {
  return (
    <Avatar variant="square">
      <img height="40px" src={`/images/champion/${champ?.img}`} />
    </Avatar>
  )
}

const SpecDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog 
      fullScreen={fullScreen} 
      open={!!props.player}
      onClose={props.onClose}
    >
      <DialogContent>
        <div>
          <List>
            <ListItem>
              <ListItemText>
                <Typography color="primary">
                Bans
                </Typography>  
                {" "}
              </ListItemText>
              {props.spec[props.player]?.bans.filter(f => f.team === "Blue").map(b => {
                return renderBan(b.champ);
              })}
            </ListItem>
            {props.spec[props.player]?.participants.filter(f => f.team === "Blue").map(i => {
              return renderPlayer(i);
            })}

            <ListItem>
              <ListItemText>
                <Typography color="error">
                Bans
                </Typography>  
                {" "}
              </ListItemText>
              {props.spec[props.player]?.bans.filter(f => f.team === "Red").map(b => {
                return renderBan(b.champ);
              })}
            </ListItem>
            {props.spec[props.player]?.participants.filter(f => f.team === "Red").map(i => {
              return renderPlayer(i);
            })}
          </List>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SpecDialog;