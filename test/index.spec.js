import BarcodeScanner from "../dist";
import {h, render} from "preact";

render(h(BarcodeScanner, {
    // onError: console.error,
    onValue: (value) => document.getElementById("result").innerText = value.getText(),
    active: true
}), document.getElementById("root"))