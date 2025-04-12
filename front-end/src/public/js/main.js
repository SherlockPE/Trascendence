"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = require("../components/message");
document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", (0, message_1.createMessage)());
});
