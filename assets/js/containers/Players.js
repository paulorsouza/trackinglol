/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import robs from '../../static/images/eorobs.jpg';
import pai from '../../static/images/pai.jpg';
import carioca from '../../static/images/carigod.jpg';
import thaigo from '../../static/images/thaigo.jpg';
import luci from '../../static/images/why.jpg';
import axios from 'axios';
import { createSocket, joinChannel, leaveChannel } from '../channels';

const tinLabels = ["Vendo vulcões", "Jogando FF com a Thaiga", "Em call com a Moru"];
const brttLabels = ["Jogando Dota", "Procurando whats do ESA", "Academia", "Fazendo Tiktok"];
const luciLabels = ["Revendo twitter do ESA", "Vendo K-pop", "Fumando"];
const cariokLabels = ["Aprendendo Dota pra carregar o Pai", "Preparando discurso de MVP do MSI"];
const roboLabels = ["Fazendo Vlog", "Ensinando o IRIRIRIRI mentality para os EUROPAS", "Fazendo IRIRIRIRIRIRIRI na cara dos grigos", "É o ROBS"];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function mobaLink(nick) {
  return `https://app.mobalytics.gg/lol/profile/euw/${nick}/overview`;
}

function opggLink(nick) {
  return `https://euw.op.gg/summoner/userName=${nick}`;
}

function PlayersContainer(props) {
  const [state, setState] = useState(null);
  const [spec, setSpec] = useState({
    tin: null,
    cariok: null,
    brtt: null,
    luci: null,
    robo: null
  });
  const [labels, setLabels] = useState({
    tin: tinLabels[getRandomInt(0, tinLabels.length)],
    cariok: cariokLabels[getRandomInt(0, cariokLabels.length)],
    brtt: brttLabels[getRandomInt(0, brttLabels.length)],
    luci: luciLabels[getRandomInt(0, luciLabels.length)],
    robo: roboLabels[getRandomInt(0, roboLabels.length)]
  })

  const preventDefault = (event) => event.preventDefault();
  
  useEffect(() => {
    axios.get("/api/players").then((r) => setState(r.data));
  }, [])

  useEffect(() => {
    const socket = createSocket();
    joinChannel(socket, "pain:players", (channel) => {
      console.log("aqui 1");
      
      channel.on('update_rank', rank => {
        console.log("aqui?????????????");
        console.log(rank);
      })

      console.log(channel);

      channel.on("*", g => console.log("eeee"))
    })
  }, [])

  useEffect(() => {
    setLabels({...labels, tin: tinLabels[getRandomInt(0, tinLabels.length)]})
  }, [spec.tin])

  useEffect(() => {
    setLabels({...labels, cariok: cariokLabels[getRandomInt(0, cariokLabels.length)]})
  }, [spec.cariok])

  useEffect(() => {
    setLabels({...labels, brtt: brttLabels[getRandomInt(0, brttLabels.length)]})
  }, [spec.brtt])

  useEffect(() => {
    setLabels({...labels, luci: luciLabels[getRandomInt(0, luciLabels.length)]})
  }, [spec.luci])

  useEffect(() => {
    setLabels({...labels, robo: roboLabels[getRandomInt(0, roboLabels.length)]})
  }, [spec.robo])

  return (
    <Container fixed>
        <Typography variant="h4" component="h4">
          Tracking the GODS
        </Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img height="40px" src={robs} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography>
              {state?.robo.rank}{" "}{state?.robo.lp}LP {state?.robo.wins}W/{state?.robo.losses}L{" "}
              <Link target="_blank" href={opggLink(state?.robo.name)}>
                OP.GG
              </Link>
              {" "}
              <Link target="_blank" href={mobaLink(state?.robo.name)}>
                Mobalytics
              </Link>
              
            </Typography>
            {spec.robo ? (
              <Chip label={`em partida a ${Math.floor(spec.robo.gameLength / 60)} minutos`} color="primary" onClick={() => axios.get('spec/robo')} />
            ) : (
              <Chip label={labels.robo} color="secondary" />
            )}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img height="40px" src={carioca} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography>
              {state?.cariok.rank}{" "}{state?.cariok.lp}LP {state?.cariok.wins}W/{state?.cariok.losses}L{" "}
              <Link target="_blank" href={opggLink(state?.cariok.name)}>
                OP.GG
              </Link>
              {" "}
              <Link target="_blank" href={mobaLink(state?.cariok.name)}>
                Mobalytics
              </Link>
              
            </Typography>
            {spec.cariok ? (
              <Chip label={`em partida a ${Math.floor(spec.cariok.gameLength / 60)} minutos`} color="primary" onClick={() => axios.get('spec/cariok')} />
            ) : (
              <Chip label={labels.cariok} color="secondary" />
            )}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img height="40px" src={thaigo} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography>
              {state?.tin.rank}{" "}{state?.tin.lp}LP {state?.tin.wins}W/{state?.tin.losses}L{" "}
              <Link target="_blank" href={opggLink(state?.tin.name)}>
                OP.GG
              </Link>
              {" "}
              <Link target="_blank" href={mobaLink(state?.tin.name)}>
                Mobalytics
              </Link>
            </Typography>
            {spec.tin ? (
              <Chip label={`em partida a ${Math.floor(spec.tin.gameLength / 60)} minutos`} color="primary" onClick={() => axios.get('spec/tin')}/>
            ) : (
              <Chip label={labels.tin} color="secondary" />
            )}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img height="40px" src={pai} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography>
              {state?.brtt.rank}{" "}{state?.brtt.lp}LP {state?.brtt.wins}W/{state?.brtt.losses}L{" "}
              <Link target="_blank" href={opggLink(state?.brtt.name)}>
                OP.GG
              </Link>
              {" "}
              <Link target="_blank" href={mobaLink(state?.brtt.name)}>
                Mobalytics
              </Link>
              
            </Typography>
            {spec.brtt ? (
              <Chip label={`em partida a ${Math.floor(spec.brtt.gameLength / 60)} minutos`} color="primary" onClick={() => axios.get('spec/brtt')} />
            ) : (
              <Chip label={labels.brtt} color="secondary" />
            )}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img height="40px" src={luci} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography>
              {state?.luci.rank}{" "}{state?.luci.lp}LP {state?.luci.wins}W/{state?.luci.losses}L{" "}
              <Link target="_blank" href={opggLink(state?.luci.name)}>
                OP.GG
              </Link>
              {" "}
              <Link target="_blank" href={mobaLink(state?.luci.name)}>
                Mobalytics
              </Link>
              
            </Typography>
            {spec.luci ? (
              <Chip label={`em partida a ${Math.floor(spec.luci.gameLength / 60)} minutos`} color="primary" onClick={() => axios.get('spec/luci')} />
            ) : (
              <Chip label={labels.luci} color="secondary" />
            )}
          </ListItemText>
        </ListItem>

        {/* <ListItem>
          <ListItemAvatar>
            <Avatar>
              T
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography>
              TESTE
              
            </Typography>
            <Chip label={`em partida a ${1} minutos`} color="primary" onClick={() => axios.get('spec/test')} />
          </ListItemText>
        </ListItem> */}
      </List>
    </Container>
  )
}

export default PlayersContainer;
