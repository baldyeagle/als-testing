import { AsyncLocalStorage } from "async_hooks";

/**
 * @type Map<string, any>
 */
const storage = (globalThis.storage ??= new AsyncLocalStorage());

/**
 * @type Map<string, any>
 */
const store = new Map([["temp", "stored temporary value!!!"]]);

/**
 * @param { import ("express").Request } req
 * @param { import ("express").Response } res
 * @param { import ("express").NextFunction } next
 * @returns { void }
 */
function middleware(req, res, next) {
  storage.run(store, next);
}

/**
 * @type { function(string): any }
 */
function get(key) {
  return storage.getStore()?.get(key);
}

/**
 * @type { function(string, any): void }
 */
function set(key, value) {
  storage.getStore()?.set(key, value);
}

export default {
  middleware,
  get,
  set,
};
