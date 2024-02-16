# AsyncLocalStorage Testing (als-testing)

This repo is set up to test the functionality of `AsyncLocalStorage` in various React-based frameworks. The issue is that accessing a store needs to be in the asynchronous context. For example:

```ts
import { AsyncLocalStorage } from "async_hooks";

const storage = new AsyncLocalStorage<Map<string, any>>();

const store = new Map<string, any>([["temp", "stored temporary value!!!"]]);

// initialize with store and create async context
storage.run(store, () => {
  const temp = storage.getStore()?.get("temp");
  console.log(temp ?? "undefined"); // will be "stored temporary value!!!
});

// do not initialize and use the store
const temp = storage.getStore()?.get("temp");
console.log(temp ?? "undefined"); // will be "undefined"
```

More info: https://nodejs.org/api/async_context.html#asynclocalstoragegetstore

To install dependencies:

```bash
bun install
```

To run an individual project:

```bash
cd packages/[project] && bun dev
```

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Glossary

- ALS - Async Local Storage

| Port   | App with ALS              | Convenient Link       | Working? |
| ------ | ------------------------- | --------------------- | -------- |
| 3100   | Express                   | http://localhost:3100 | Yes      |
| 3101   | Next.JS                   | http://localhost:3101 | No       |
| 3102   | Next.JS custom server     | http://localhost:3102 | Yes      |
| 3103   | Next.JS express server    | http://localhost:3103 | Yes      |
| 3000\* | Remix with express server | http://localhost:3000 | Yes      |

\* I couldn't figure out how to *actually* change the port :(
