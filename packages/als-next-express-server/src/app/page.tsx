import context from "@/storage";

export default function Home() {
  return (
    <main>
      <p>{`Hello world with ${context.get("temp") ?? "undefined"}`}</p>
    </main>
  );
}
