"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortUrl = void 0;
const nanoid_1 = require("nanoid");
const CHARS = '1234567890abcdefghijklmnopqrstuvwxyz';
const DOMAIN = 'pbid.io';
const PROTOCOL = 'https';
const NANOID = nanoid_1.customAlphabet(CHARS, 8);
const generateShortUrl = (domain = DOMAIN, protocol = PROTOCOL, nanoid = NANOID()) => {
    return `${protocol}://${domain}/${nanoid}`;
};
exports.generateShortUrl = generateShortUrl;
