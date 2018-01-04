import statuses               from './statuses.helper';
import { MessagingChannel }   from './channel.helper';
import { MessagingAction }    from './action.helper';
import { MessagingUtil }      from './util.helper';

module.exports = (settings) => {

  let utils = new MessagingUtil();
  let messagingChannel = new MessagingChannel({ utils });

  return {
    utils,
    statuses,
    actions: new MessagingAction({ settings, utils, MessagingChannel: messagingChannel })
  };
};
