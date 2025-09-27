import pkg from './libs/index.js';
const TuyaWebsocket = pkg.default;

export function startTuyaPush({ accessId, accessKey, url, env, onMessage }) {
    const client = new TuyaWebsocket({
        accessId,
        accessKey,
        url,
        env,
        maxRetryTimes: 100,
    });

    client.open(() => console.log('Tuya WS opened'));
    client.message((ws, message) => {
        client.ackMessage(message.messageId); // Xác nhận nhận message
        if (onMessage) onMessage(message);   // callback gửi về backend
    });
    client.reconnect(() => {
    });

    client.ping(() => {
    });

    client.pong(() => {
    });

    client.close((ws, ...args) => {
        console.log('close', ...args);
    });

    client.error((ws, err) => console.log('Tuya WS error', err));
    client.start();

    return client;
}