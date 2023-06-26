const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { EmailService} = require('./services')
const amqplib = require("amqplib");

async function consumequeue() {
    try {
        const queue = 'tasks';
        const connection = await amqplib.connect('amqp://localhost');
      
        const ch1 = await connection.createChannel();
        await ch1.assertQueue(queue);
    
        await ch1.consume ( queue ,  (data) => {

          console.log(`${Buffer.from(data.content)}`) ;
          const object = JSON.parse(`${Buffer.from(data.content)}`);
         
           EmailService.sendEmail("serviceairlinenotification@gmail.com", object.recepientEmail, object.subject, object.text);
          ch1.ack(data); 

        })
    } catch (error) {
        console.log(error)
    }
     
    }
    

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
consumequeue()
console.log("queue is up")

});


