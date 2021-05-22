"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UrlSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model('Url', UrlSchema);
