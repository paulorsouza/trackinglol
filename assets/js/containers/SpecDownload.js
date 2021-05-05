import React, { useRef, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Page from '../components/Page';

const Download = (props) => {
  const ref = useRef(null)
  const [play, setPlay] = useState(false); 
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Page title="Auxiliar de Spec">
      <Box>
        <Link target="_blank" href={"https://mega.nz/file/JBwiyDZD#aaqtP9GESvFhlfJO6dXBQOZCnbtwhGnDGCh9DAJgG-E"}>
          Auxiliar de Spec (Instalador)
        </Link>
      </Box>
      
      <Box>
        <Link target="_blank" href="https://mega.nz/folder/dQw2nBYQ#m81HpoK6TZDZwCG8jZlTUA">
          Auxiliar de Spec (Portátil)
        </Link>
      </Box>
      
    </Page>
  )
}

export default Download;