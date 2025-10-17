import express from "express";
import { callTuya } from "./tuyaApi.js";
import { startTuyaPush } from './tuyaPushClient.js';
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

app.use(cors({
    origin: ["https://hoai.homes", "https://www.hoai.homes", "http://localhost:5173"], // hoặc mảng domain frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const logger = (text, data) => {
    if (env === "dev") {
        console.log(text, JSON.stringify(data, null, 2));
    }
}

let clients = [];

// Endpoint SSE
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // gửi comment ban đầu
    res.write(': connected\n\n');

    // thêm client vào mảng
    clients.push(res);

    // remove client khi disconnect
    req.on('close', () => {
        clients = clients.filter(c => c !== res);
    });
});

function sendToClients(msg) {
    clients.forEach(res => {
        res.write(`data: ${JSON.stringify(msg)}\n\n`);
    });
}

//Message Queue từ Tuya
const tuyaClient = startTuyaPush({
    accessId: '97djrgkesmtjarecadhu',
    accessKey: '99a76409afc9436f98cc954be74b2a07',
    url: "wss://mqe.tuyaus.com:8285/",
    env: "prod",
    subscriptionId: '97djrgkesmtjarecadhu-sub-iot-web',
    onMessage: (msg) => {
        sendToClients(msg);
    }
});

let cachedToken = null;
let tokenExpireAt = 0;

const getToken = async () => {
    const now = Date.now();
    if (cachedToken && now < tokenExpireAt) {
        return cachedToken;
    }

    const data = await callTuya("/v1.0/token?grant_type=1", "GET");
    cachedToken = data.result.access_token;

    // Tuya trả về expires_in (giây), thường là 7200
    tokenExpireAt = now + (data.result.expire_time * 1000) - 60 * 1000;
    // Trừ đi 1 phút để an toàn

    return cachedToken;
};


// Route lấy token
app.get("/api/token", async (req, res) => {
    try {
        const accessToken = await getToken();
        res.json(accessToken);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ví dụ route lấy danh sách thiết bị
app.get("/api/devices", async (req, res) => {
    try {
        // 1. Lấy token mới
        const accessToken = await getToken();

        // 2. Gọi API lấy danh sách thiết bị trong space
        const spaceId = "198008855"; // FE có thể truyền vào
        const url = `/v2.0/cloud/thing/space/device?is_recursion=false&page_size=20&space_ids=${spaceId}`;

        // Dùng lại callTuya (có sign + t đầy đủ)
        const devices = await callTuya(url, "GET", "", accessToken);

        res.json(devices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/device/:id", async (req, res) => {
    try {
        // 1. Lấy token mới
        const accessToken = await getToken();

        // 2. Gọi API lấy trạng thái thiết bị
        const id = req.params.id;
        const url = `/v1.0/iot-03/devices/${id}/status`;

        // Dùng lại callTuya (có sign + t đầy đủ)
        const deviceStatus = await callTuya(url, "GET", "", accessToken);

        res.json(deviceStatus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/device_details/:id", async (req, res) => {
    try {
        // 1. Lấy token mới
        const accessToken = await getToken();

        // 2. Gọi API lấy danh sách thiết bị trong space
        const id = req.params.id;
        const url = `/v2.0/cloud/thing/${id}`;

        // Dùng lại callTuya (có sign + t đầy đủ)
        const deviceStatus = await callTuya(url, "GET", "", accessToken);

        res.json(deviceStatus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/set_status/:deviceId", async (req, res) => {
    try {
        const accessToken = await getToken();

        const id = req.params.deviceId;
        const url = `/v2.0/cloud/thing/${id}/shadow/properties/issue`;

        if (!req.body || !req.body.properties) {
            return res.status(400).json({ error: "Missing properties in request body" });
        }

        const { properties } = req.body;
        const body = { "properties": properties };

        // console.log(body);


        const response = await callTuya(url, "POST", body, accessToken)

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend chạy trên port ${PORT}`));

