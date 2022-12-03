const {
    default: Wabot,
    useSingleFileAuthState,
    downloadMediaMessage,
    DisconnectReason
} = require("@adiwajshing/baileys");

const { Boom } = require("@hapi/boom");
const P = require("pino");
const fs =  require("fs");
const { default: makeLegacySocket } = require("@adiwajshing/baileys/lib/LegacySocket");

const {state, saveState} = useSingleFileAuthState("botStickerSession.json");

const logger = P();

function runBot(){
    const sock = Wabot({
        auth: state,
        printQRInTerminal: true,
        logger: P({level: "silent"})
    });

    sock.ev.on("connection.update",({connection, lastDisconnect})=>{
        if(connection === "close"){
            let error = new Boom(lastDisconnect.error);
            let alasanError = error?.output?.statusCode;

            if(alasanError === DisconnectReason.loggedOut){
                sock.logout();
            }else{
                runBot();
            }
        }else{
            console.log("connection opened");
        }
    });
    sock.ev.on("messages.upsert", async ({messages, type})=>{
        const msg = messages[0];
        // console.log(msg);
        if(!msg.message || msg.key.remoteJid === "status@broadcast" || msg.key.fromMe || !msg.message.imageMessage)return;
        let caption = await msg.message.imageMessage.caption;
        // console.log(caption);

        let buffer = await downloadMediaMessage(msg, "buffer", {}, {logger});
        console.log(buffer);
        // fs.writeFileSync("img/mydownload.jpeg", buffer);
        // console.log(buffer);
    });
    sock.ev.on("messages.upsert", async ({messages, type})=>{
        const nama = messages[0].pushName;
        let pesan = messages[0].message.conversation;
        const id = messages[0].key.remoteJid;
        if(pesan === 'hai'){
            const sentMsg  = await sock.sendMessage(id,
                { text: `Hai `+nama+ `,\n`+ 
`Nice too meet you!`})
        }
    });
    sock.ev.on("creds.update", saveState);
}
console.log("asd");
runBot();