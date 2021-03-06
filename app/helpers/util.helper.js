export class MessagingUtil {
  
  sleep (time_sleep=10000, message){
    if ((process.env.NODE_ENV !== "test") && message) console.info(`${process.env.npm_package_name}: ${message} in ${time_sleep} ms`)
    return new Promise((resolve, reject)=>{
      setTimeout(function () {
        resolve();
      }, time_sleep);
    });
  }
  
};
