window.backend = (window.location.hostname === 'localhost') ? 'http://localhost:1337' : 'https://boost3.sbtp.xyz'
window.frontend = (window.location.hostname === 'localhost') ? 'http://localhost:1234' : 'https://sbtp.xyz'

import Alpine from 'alpinejs'
import router from '@shaun/alpinejs-router'
import persist from '@alpinejs/persist'
import { registerAuthStore } from "./stores/auth.js";
import { registerRequestStore } from "./stores/request.js";
import { registerGameStore } from "./stores/game.js";
import { registerOfferStore } from "./stores/offer.js";
import { registerErrorStore } from "./stores/error.js";
import { registerEnvStore } from "./stores/env.js";
import { auth } from "./components/auth.js";
import { offer } from "./components/offer.js";
import { game } from "./components/game.js";
import { error } from "./components/error.js";
import { settings } from "./components/settings.js";
import { account } from './components/account.js';
import { conditionGuide } from './components/condition-guide.js';
import { setlist } from './components/setlist.js';

window.router = router

Alpine.plugin(router)
Alpine.plugin(persist);
registerAuthStore(Alpine);
registerGameStore(Alpine);
registerRequestStore(Alpine);
registerOfferStore(Alpine);
registerErrorStore(Alpine);
registerEnvStore(Alpine);

window.setlist = setlist;
window.conditionGuide = conditionGuide;
window.account = account;
window.auth = auth;
window.settings = settings;
window.game = game;
window.offer = offer;
window.error = error;
window.Alpine = Alpine;

queueMicrotask(() => {
  Alpine.start();
});


