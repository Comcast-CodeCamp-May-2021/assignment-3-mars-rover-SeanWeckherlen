
class Rover {
  constructor(position){
    this.position = position; 
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message){
    let outputObject = { 
      message: message.name, 
      results: []
    }
      let resultObjectOne = {};
      let roverStatusObj = {};
      let resultObjectTwo = {};
      let resultObjectThree = {};
      for(let i = 0; i < message.commands.length; i++){
        if (message.commands[i].commandType === 'STATUS_CHECK'){
          resultObjectOne["completed"] = true;
          roverStatusObj["position"] = this.position;
          roverStatusObj["mode"] = this.mode;
          roverStatusObj["generatorWatts"] = this.generatorWatts;
          resultObjectOne["roverStatus"] = roverStatusObj;
         outputObject.results.push(resultObjectOne);  
        } 
        else if (message.commands[i].commandType === 'MODE_CHANGE'){
          resultObjectTwo["completed"] = true;
          outputObject.results.push(resultObjectTwo);
          this.mode = 'LOW_POWER';
        }
        else if (message.commands[i].commandType === 'MOVE'){
          if(this.mode === 'LOW_POWER'){
            resultObjectThree["completed"] = false;
          } else{
            resultObjectThree["completed"] = true;
            this.position = message.commands[i].value
          }
          outputObject.results.push(resultObjectThree);
        }
      }
      return outputObject;
    } 
} 


module.exports = Rover;