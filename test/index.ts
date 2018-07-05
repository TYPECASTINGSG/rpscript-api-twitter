import {expect} from 'chai';
import m from 'mocha';

import RPSTwitter from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('Twitter', () => {

  m.it('should get tweets', async function () {
    let ctx = new RpsContext
    ctx.addModuleContext('twitter',
      {consumer_key:'KEY',consumer_secret:'SECRET'});
    
      let md = new RPSTwitter(ctx);
    let output = await md.getTweets(ctx,{screen_name: 'nodejs'},"statuses/user_timeline");

    console.log(output);

  }).timeout(0);

})
