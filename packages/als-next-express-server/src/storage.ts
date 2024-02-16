import { AsyncLocalStorage } from "async_hooks";
import type { Request, Response, NextFunction } from "express";

declare namespace globalThis {
  export let storage: AsyncLocalStorage<Map<string, any>>;
}

const storage = (globalThis.storage ??= new AsyncLocalStorage<
  Map<string, any>
>());

const store = new Map<string, any>([["temp", "stored temporary value!!!"]]);

function middleware(req: Request, res: Response, next: NextFunction): void {
  storage.run(store, next);
}

function get(key: string): any {
  return storage.getStore()?.get(key);
}

function set(key: string, value: any): void {
  storage.getStore()?.set(key, value);
}

export default {
  middleware,
  get,
  set,
};
