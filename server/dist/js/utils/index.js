"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortUrl = void 0;
const nanoid_1 = require("nanoid");
const generateShortUrl = () => {
    const chars = '1234567890abcdefghijklmnopqrstuvwxyz';
    const domain = 'pbid.io';
    const protocol = 'https';
    const nanoid = nanoid_1.customAlphabet(chars, 8);
    return `${protocol}://${domain}/${nanoid()}`;
};
exports.generateShortUrl = generateShortUrl;
