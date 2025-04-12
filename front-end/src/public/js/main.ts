
import { createMessage } from "../components/message";

document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", createMessage());
});