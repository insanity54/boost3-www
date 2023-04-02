import Alpine from 'alpinejs'
import twitch from './twitch.js'
import { registerAuthStore } from "./stores/auth.js";
import { auth } from "./components/auth.js";

registerAuthStore(Alpine);

window.auth = auth;
window.Alpine = Alpine;

queueMicrotask(() => {
  Alpine.start();
});