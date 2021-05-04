import React from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Page from '../components/Page';
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1280px !important"
  }
}));

const Stream = () => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const lg = useMediaQuery(theme.breakpoints.down('lg'))
  const xl = useMediaQuery(theme.breakpoints.down('xl'))

  console.log(sm);

  const getWidth = () => {
    if(sm) return "600";
    if(md) return "960";
    if(lg) return "1280";
    if(xl) return "1920";
  }

  if (!getWidth()) return null;

  return (
    <Page>
        <div style={{marginTop: "10px"}}>
          <ReactTwitchEmbedVideo 
            width={getWidth()}
            channel="paulorsouza" 
          />
        </div>
    </Page>
  );
}

export default Stream;