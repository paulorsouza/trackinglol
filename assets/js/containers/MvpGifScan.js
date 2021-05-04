import React, { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import mvpVideo from '../../static/videos/MVP.mp4';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Page from '../components/Page';

const GifScan = (props) => {
  const ref = useRef(null)
  const [play, setPlay] = useState(false); 
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Page title="MVP do MSI">
      <Container style={{ 
        marginTop: "20px",
        maxWidth: `${sm ? "340px" : "800px"}` 
      }}>
        <Box onClick={() => {
          if (play) {
            ref.current.pause();
            ref.current.currentTime = "2.10";
            setPlay(false);
          } else {
            ref.current.play();
            ref.current.loop = true;
            setPlay(true);
          }
        }}>
          <video ref={ref} id="video1" width={sm ? "320px" : "800px"}>
            <source src={mvpVideo} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </Box>
      </Container>
      </Page>
  )
}

export default GifScan;