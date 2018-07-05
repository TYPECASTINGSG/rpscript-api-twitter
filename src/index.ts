/**
 * @module twitter
 */

var Twitter = require('twitter');
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

let MOD_ID = "twitter"

export interface TwitterContext {
  client?:any;
  consumer_key?: string;
  consumer_secret?: string;
  access_token_key?: string;
  access_token_secret?: string;
}

@RpsModule("twitter")
export default class RPSTwitter {

  constructor(ctx:RpsContext){
    let mapContext = ctx.getModuleContext(MOD_ID);
    
    if(!mapContext)
      ctx.event.emit(RpsContext.LOAD_MOD_ERR_EVT,MOD_ID,new Error("No config found for stackexchange module"));
    else {
      mapContext['client'] = new Twitter({
        consumer_key:mapContext['consumer_key'] || '',
        consumer_secret:mapContext['consumer_secret'] || '',
        access_token_key:mapContext['access_token_key'] || '',
        access_token_secret:mapContext['access_token_secret'] || ''
      });

      ctx.addModuleContext(MOD_ID,mapContext);
    }
  }

  @rpsAction({verbName:'get-tweets'})
  async getTweets (ctx:RpsContext,opts:Object, getting:string) : Promise<any>{
    let client = ctx.getModuleContext(MOD_ID)['client'];
    
    return new Promise( (resolve,reject) => {
      client.get(getting,opts,function (error, tweets,response) {

        if(error)reject(error);
        else resolve(tweets);
        
      });
    });
  }

}

