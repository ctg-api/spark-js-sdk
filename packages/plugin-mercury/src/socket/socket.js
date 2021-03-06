/**!
 *
 * Copyright (c) 2015-2016 Cisco Systems, Inc. See LICENSE file.
 */

import Socket from './socket-base';
import WS from 'ws';

Socket.getWebSocketConstructor = function getWebSocketConstructor() {
  return WS;
};

export default Socket;
