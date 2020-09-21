const Discord = require('discord.js');
const nodemailer = require('nodemailer');

const client = new Discord.Client();
client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;
  
    const commandBody = message.content.slice(1);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    var pattern = /^b\d{7}$/;
    if (command === "auth") {

        if(pattern.test(args)
        )
        {
                
           const filter=m => m.author.id == message.author.id;
           var email = args+"@ncl.ac.uk"; 
           message.reply('Auth code sent to '+email);  
           var code = makeCode(5)
           //TODO: send email code here

  /////////////////////////////////////////////
  
            let transporter = nodemailer.createTransport({
              service:'gmail',
              auth:{
                user: 'NUCATS.AUTH.NO.REPLY@gmail.com',
                pass: '75Z9XZShVImb'
              }
            });

            let mailOptions =
            {
              from:'NUCATS.AUTH.NO.REPLY@gmail.com',
              to: email,
              subject:'Auth Code',
              text: 'You Code is:  '+  code +'\nrequested by: '+message.author
            }

            transporter.sendMail(mailOptions, function(err,data){
              if(err)
              {
                console.log(err)
              }
            })
               

            message.delete;
            message.channel.awaitMessages(filter,{max:1,time:100000}).then (collected =>{
                if(collected.first().content === code)
                {
                    message.reply('Code Valid Roles added');                 
                    message.member.roles.add('752544421538562139');
                    message.member.roles.remove('756517108631732294');
                    message.delete;
                }
            })

        }
        else{
            message.reply('INVALID USERNAME silly');                 

        }
    
    }

  

  });

  client.login(process.env.BOT_TOKEN);

  function makeCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
