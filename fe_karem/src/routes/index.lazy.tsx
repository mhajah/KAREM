import { useUser } from "@/providers/UserProvider";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const x = useUser();
  console.log(x);
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Witaj!</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 lg:max-w-5xl">
        To projekt stworzony z myślą o wspieraniu nauki podstaw programowania i algorytmów. Inspiracją do jego powstania była moja
        krótka przygoda nauczyciela programowania w jednej z wrocławskich szkół.
      </p>
      <p className="leading-7 mt-6 lg:max-w-5xl">
        Strona jest wciąż w fazie rozwoju, dlatego serdecznie zachęcam do dzielenia się swoimi uwagami i sugestiami. Mam nadzieję,
        że w przyszłości uda się przekształcić ją w pełnoprawną platformę edukacyjną!
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Dla kogo?
      </h2>

      <p className="leading-7 [&:not(:first-child)]:mt-6">...</p>
    </div>
  );
}
