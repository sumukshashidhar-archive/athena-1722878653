const brain = require('brain.js');
const data = require('./../data/brain_data/ml_data/training_data.json');
const training_data=data.map(item=>({
  input:item.input,
  output:item.output
}))

const net = new brain.recurrent.LSTM();

net.train(training_data,{iterations:2000});

const output = net.run(['veena', 'cricket']); 
console.log(output)