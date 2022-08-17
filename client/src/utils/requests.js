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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.putRequest = exports.postRequest = exports.getRequest = void 0;
const apiRoute = "https://chat-nation.herokuapp.com/api";
const getRequest = (route) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${apiRoute}${route}`, {
        method: "GET",
        credentials: "include",
    });
    const data = yield res.json();
    return data;
});
exports.getRequest = getRequest;
const postRequest = (route, bodyObject) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${apiRoute}${route}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObject),
    });
    const data = yield res.json();
    return data;
});
exports.postRequest = postRequest;
const putRequest = (route, bodyObject) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${apiRoute}${route}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObject),
    });
    const data = yield res.json();
    return data;
});
exports.putRequest = putRequest;
const deleteRequest = (route, bodyObject) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${apiRoute}${route}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObject),
    });
    const data = yield res.json();
    return data;
});
exports.deleteRequest = deleteRequest;
