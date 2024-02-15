# als-testing

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

| Port | App with ALS           | Convenient Link       | Working? |
| ---- | ---------------------- | --------------------- | -------- |
| 3100 | Express                | http://localhost:3100 | Yes      |
| 3101 | Next.JS                | http://localhost:3101 | No       |
| 3102 | Next.JS custom server  | http://localhost:3102 | No       |
| 3103 | Next.JS express server | http://localhost:3103 | No       |
