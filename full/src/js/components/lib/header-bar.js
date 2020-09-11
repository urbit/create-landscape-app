import React from 'react';

import { useLocation } from 'react-router-dom';
import { Row, Box, Text, Icon } from '@tlon/indigo-react';
import { StatusBarItem } from './icons/StatusBarItem';
import { Sigil } from './icons/sigil';


const HeaderBar = (props) => {

  const display = (!window.location.href.includes('popout/'))
    ? 'grid' : 'none';

  return (
    <Box
      display={display}
      width="100%"
      gridTemplateRows="30px"
      gridTemplateColumns="3fr 1fr"
      py={2}
    >
      <Row collapse>
        <StatusBarItem mr={2} onClick={() => window.location.href = '/'}>
          <img
            className='invert-d'
            src='/~landscape/img/icon-home.png'
            height='11'
            width='11'
          />
        </StatusBarItem>
        <StatusBarItem
          onClick={() => window.location.href = '/~groups'}>
          <img
            className='invert-d v-mid'
            src='/~landscape/img/groups.png'
            height='15'
            width='15'
          />
          <Text display={["none", "inline"]} ml={2}>Groups</Text>
        </StatusBarItem>
      </Row>
      <Row justifyContent="flex-end" collapse>
        <StatusBarItem onClick={() => window.location.href = '/~profile'}>
          <Sigil ship={window.ship} size={24} color={"#000000"} classes="dib mix-blend-diff" />
          <Text ml={2} display={["none", "inline"]} fontFamily="mono">~{window.ship}</Text>
        </StatusBarItem>
      </Row>
    </Box>
  );
};

export default HeaderBar;
