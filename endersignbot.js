const {Telegraf} = require("telegraf");
const mariadb = require("mysql2");
const fs = require("fs");

const pool= mariadb.createPool(JSON.parse(
        fs.readFileSync('dbconfig', 'utf-8')
    ));

const bot = new Telegraf(fs.readFileSync('token','utf-8'));

bot.start((ctx) => {
    ctx.reply('你好.');
})

//入群事件
bot.on('new_chat_members', async (ctx) => {
    if(ctx.message.new_chat_members.find(member=>member.id === bot.botInfo.id))
    {
        console.log('进入新会话，会话id'+ctx.chat.id);
        ctx.reply('新会话，会话id'+ctx.chat_id);
    }
})

//离群事件
bot.on('left_chat_member', async (ctx) => {
    if(ctx.message.left_chat_member.id === bot.botInfo.id)
    {
        console.log('被移出会话，会话id'+ctx.chat.id);
    }
})

bot.telegram.setMyCommands([
    {command: 'help', description: '帮助信息'},

    {command: 'listen', description: '监听频道'},
    {command: 'sync', description: '同步'},

    {command: 'postsign', description: '贴一张同步公告'},
    {command: 'makesign', description: '创建一张同步公告'}
    ]
).then(() =>{

}).catch(err=>{

});

// 处理所有消息
// bot.on('message', (ctx) => {
//     const message = ctx.message;
//
//     if (message.photo) {
//         // 消息包含图片
//         ctx.reply('你发送了一张图片');
//
//         if (message.caption) {
//             // 图片包含文本说明
//             ctx.reply('图片的说明文本是: ' + message.caption);
//         } else {
//             // 图片不包含文本说明
//             ctx.reply('这张图片没有包含说明文本');
//         }
//     } else {
//         // 消息不包含图片
//         ctx.reply('你发送的消息不包含图片');
//     }
// });

bot.command('get_chat_id', (ctx) => {
    const chatId = ctx.chat.id;
    ctx.reply(`这个会话的ID是: ${chatId}`);
});


bot.launch();

console.log('bot is running');