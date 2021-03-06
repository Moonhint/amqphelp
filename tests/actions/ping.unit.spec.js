'use strict';

const pathfinder = require(process.env.PWD + '/pathfinder');
const expect = require('chai').expect;
const { MessagingAction } = require(pathfinder.to_app() + "/action.helper");
const { MessagingUtil } = require(pathfinder.to_app() + "/util.helper");
const { MessagingChannel } = require(pathfinder.to_app() + "/channel.helper");

const sinon = require('sinon');

describe("[ Messaging Helper | Ping Action ]", function(){

  describe('a correct call on ping', ()=>{

    const BROKER_HOST = 'localhost';
    const BROKER_USER = 'guest';
    const BROKER_PASS = 'guest';

    let messagingChannel, messagingAction;

    let interval, clock, publish_stub;

    beforeEach(async ()=>{
      let utils = new MessagingUtil();
      messagingChannel = new MessagingChannel({utils});

      let channel_stub = sinon.stub({
        publish(){return 1}
      });

      let settings = {
        connection: {
          host: BROKER_HOST,
          options: {
            user: BROKER_USER,
            pass: BROKER_PASS
          }
        }
      }

      let create_channel_stub = sinon.stub(messagingChannel, "create");
      create_channel_stub.withArgs(BROKER_HOST, BROKER_USER, BROKER_PASS).returns(channel_stub);

      messagingAction = new MessagingAction({ settings:settings, MessagingChannel: messagingChannel });

      publish_stub =sinon.stub(messagingAction, 'publish')

      clock = sinon.useFakeTimers();
      interval = await messagingAction.ping();
      clock.tick(6000);
    });
    
    it('should call publish', ()=>{
      expect(publish_stub.calledTwice).to.true
      expect(publish_stub.firstCall.args[0]).to.equal('amqphelp_heartbeat')
      expect(publish_stub.firstCall.args[1]).to.equal('beat')
    })

    it('should increase ping count', async ()=>{
      expect(messagingAction.ping_count).to.equal(2);
    });

    afterEach(()=>{
      messagingChannel.create.restore();
      clearInterval(interval);
      clock.restore();
    });

  });

});
