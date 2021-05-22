"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_1 = require("../controllers/url");
const router = express_1.Router();
router.get('/urls', url_1.getUrls);
router.post('/url', url_1.addUrl);
exports.default = router;
