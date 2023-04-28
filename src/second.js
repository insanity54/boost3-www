window.backend = (window.location.hostname === 'localhost') ? 'http://localhost:1337' : 'https://boost3.sbtp.xyz'

import PineconeRouter from 'pinecone-router'
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import { registerAuthStore } from "./stores/auth.js";
import { auth } from "./components/auth.js";



Alpine.plugin(PineconeRouter)
Alpine.plugin(persist)
registerAuthStore(Alpine);

window.Alpine = Alpine;

queueMicrotask(() => {
  Alpine.start();
});


