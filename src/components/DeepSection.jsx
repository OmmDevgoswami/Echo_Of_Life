import SplitTextReveal from "./SplitTextReveal";

export default function DeepSection() {
  return (
    <section className="h-screen flex items-center justify-center text-center px-6">

      <SplitTextReveal
        text="May the little witch never lose her magic once again."
        className="text-xl md:text-3xl font-serif max-w-2xl"
      />

    </section>
  );
}