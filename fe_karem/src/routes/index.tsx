import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/typography/Typography';
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header variant="h1">
        Witaj!
      </Header>
      <p className="leading-7 [&:not(:first-child)]:mt-6 lg:max-w-5xl">
        To projekt stworzony z myślą o wspieraniu nauki podstaw programowania i
        algorytmów. Inspiracją do jego powstania była moja krótka przygoda
        nauczyciela programowania w jednej z wrocławskich szkół.
      </p>
      <p className="leading-7 mt-6 lg:max-w-5xl">
        Strona jest wciąż w fazie rozwoju, dlatego serdecznie zachęcam do
        dzielenia się swoimi uwagami i sugestiami. Mam nadzieję, że w
        przyszłości uda się przekształcić ją w pełnoprawną platformę edukacyjną!
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Dla kogo?
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Strona przeznaczona jest dla osób, które chcą się nauczyć podstaw programowania, algorytmów, czy w przyszłości Reacta. <br />
        Zdaję sobie sprawę, że nauka programowania w szkołach średnich jest często nieefektywna, co pokazują liczne statystyki - na przykład ilość osób przystępujących do matury rozszerzonej z informatyki. <br />
        Sytuacja nie jest lepsza w technikach, które teoretycznie posiadają całe profile, które w nazwie mają "programista", czy "informatyk", a egzaminy zawodowe - mimo stosunkowo niskiego poziomu (opinia autora) - również mają zdawalność daleką od idealnej.
        <br />
        Z myślą o tych wszystkich osobach, które chcą się rozwinąć, powstaje ta strona.
        
      </p>
      
    </div>
  )
}
