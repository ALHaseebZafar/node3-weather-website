const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=488cbcd33539dbb2c32e0f7764fc03f4&%20query='+latitude+','+longitude+'&units=f'
    request({url:url,json:true},(error,{body},)=>{
      if(error){
        callback('unable to connect location',undefined);
      }
      else if(body.error){
        callback('entered wrong coordinates',undefined);
      }
      else{
        
        callback(undefined
          ,body.current.weather_descriptions[0]+'it is curreently '+body.current.temperature+'it feels like '+body.current.feelslike+' degrees out.the Humidity is'+body.current.humidity+'%');
      }
    })
  }


  module.exports=forecast;
  