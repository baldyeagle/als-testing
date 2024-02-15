import context from "@/storage";

export default async function Home() {
  return (
    <main>
      <p>{`Hello world with ${context.get("temp") ?? "undefined"}`}</p>
    </main>
  );
}
