import crypto from "crypto";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.TUYA_CLIENT_ID;
const clientSecret = process.env.TUYA_CLIENT_SECRET;
const endpoint = process.env.TUYA_ENDPOINT;

// Hàm sinh chữ ký
function sha256(content) {
    return crypto.createHash("sha256").update(content).digest("hex");
}

export function signRequest(method, path, body = "", accessToken = null) {
    const clientId = process.env.TUYA_CLIENT_ID;
    const clientSecret = process.env.TUYA_CLIENT_SECRET;

    const t = String(Date.now()); // hoặc Date.now() - 60000 nếu server chênh lệch giờ
    const bodyStr = body ? JSON.stringify(body) : "";
    const contentHash = sha256(bodyStr);

    // stringToSign
    const stringToSign = [
        method.toUpperCase(),
        contentHash,
        "", // empty line
        path
    ].join("\n");

    // fullSign
    const fullSign = accessToken
        ? clientId + accessToken + t + stringToSign
        : clientId + t + stringToSign;

    const sign = crypto
        .createHmac("sha256", clientSecret)
        .update(fullSign)
        .digest("hex")
        .toUpperCase();

    return { sign, t };
}

// Gọi API Tuya
export async function callTuya(path, method = "GET", body = "", accessToken = null) {
    const { sign, t } = signRequest(method, path, body, accessToken);

    const headers = {
        "client_id": process.env.TUYA_CLIENT_ID,
        "sign": sign,
        "t": t,
        "sign_method": "HMAC-SHA256",
        "Content-Type": "application/json"
    };

    if (accessToken) {
        headers["access_token"] = accessToken;
    }

    const res = await fetch(process.env.TUYA_ENDPOINT + path, {
        method,
        headers,
        body: method === "GET" ? null : body
    });

    return await res.json();
}