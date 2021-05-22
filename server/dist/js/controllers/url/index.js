"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUrl = exports.getUrls = void 0;
const url_1 = __importDefault(require("../../models/url"));
const getUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const urls = yield url_1.default.find();
        res.status(200).json({ urls });
    }
    catch (error) {
        throw error;
    }
});
exports.getUrls = getUrls;
const addUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const url = new url_1.default({ url: body.url });
        const newUrl = yield url.save();
        const allUrls = yield url_1.default.find();
        res.status(201).json({ message: 'Url added', url: newUrl, urls: allUrls });
    }
    catch (error) {
        throw error;
    }
});
exports.addUrl = addUrl;