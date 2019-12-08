//How will I implement this properly?
const brain = require('brain.js')
const data = require('./../data/brain_data/ml_data/training_data.json')

const neuralNetwork = new brain.recurrent.LSTM();

const training_data = data.map(item => ({
    input: item.input, 
    output: item.output
}))


neuralNetwork.train(training_data, {
    iterations: 3000
})



const output = neuralNetwork.run(['singing', 'veena'])//Whatever piece of text I want to run here

console.log(`Output: ${output}`)