import SplitTextReveal from "./SplitTextReveal";

export default function DeepSection() {
  return (
    <section className="h-screen flex items-center justify-center text-center px-6">

      <SplitTextReveal
        text="Some stories are not written in ink, but in quiet acts of care."
        className="text-xl md:text-3xl font-serif max-w-2xl"
      />

    </section>
  );
}