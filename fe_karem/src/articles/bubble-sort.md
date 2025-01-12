---
title: "Bubble Sort"
tags: ["react", "markdown", "typescript"]
date: "2025-01-11"
author: "John Doe"
priority: 1
category: "algorithms"
---

# Algorytm Bubble Sort

## Wstęp

Sortowanie to jeden z podstawowych problemów informatyki, stosowany w niezliczonych aplikacjach, od zarządzania danymi w bazach danych po optymalizację operacji w programach. Jednym z najprostszych i najbardziej znanych algorytmów sortowania jest **Bubble Sort** (sortowanie bąbelkowe). Pomimo swojej prostoty i ogólnej nieskuteczności w przypadku dużych zbiorów danych, algorytm ten jest często wykorzystywany w celach edukacyjnych do nauki podstawowych koncepcji programowania i analizy algorytmów.

$f_x = n^3$

W tym artykule przyjrzymy się szczegółowo algorytmowi Bubble Sort, jego działaniu, złożoności obliczeniowej, zaletom i wadom oraz zastosowaniom.

---

## Jak działa Bubble Sort?

Bubble Sort działa poprzez wielokrotne przechodzenie przez zbior danych, porównywanie sąsiednich elementów i zamianę ich miejscami, jeśli są w niewłaściwej kolejności. Proces ten jest powtarzany, dopóki cały zbior danych nie zostanie posortowany. Nazwa "bąbelkowe" pochodzi od sposobu, w jaki "największe" elementy stopniowo "wynurzają się" na początek lub koniec zbioru, podobnie jak bąbelki w wodzie.

### Pseudokod

Oto podstawowy pseudokod dla algorytmu Bubble Sort:

```
Dla i od 0 do n-1
    Dla j od 0 do n-i-2
        Jeśli element[j] > element[j+1]
            Zamień element[j] z element[j+1]
```

### Wizualizacja

Rozważmy przykładowy zbior: [5, 3, 8, 4, 2]

1. **Pierwsze przejście:**

   - Porównujemy 5 i 3. Ponieważ 5 > 3, zamieniamy miejscami.
     [3, 5, 8, 4, 2]
   - Porównujemy 5 i 8. Nic nie zmieniamy.
     [3, 5, 8, 4, 2]
   - Porównujemy 8 i 4. Zamieniamy miejscami.
     [3, 5, 4, 8, 2]
   - Porównujemy 8 i 2. Zamieniamy miejscami.
     [3, 5, 4, 2, 8]

2. **Drugie przejście:**

   - Porównujemy 3 i 5. Nic nie zmieniamy.
     [3, 5, 4, 2, 8]
   - Porównujemy 5 i 4. Zamieniamy miejscami.
     [3, 4, 5, 2, 8]
   - Porównujemy 5 i 2. Zamieniamy miejscami.
     [3, 4, 2, 5, 8]

3. **Trzecie przejście:**

   - Porównujemy 3 i 4. Nic nie zmieniamy.
     [3, 4, 2, 5, 8]
   - Porównujemy 4 i 2. Zamieniamy miejscami.
     [3, 2, 4, 5, 8]

4. **Czwarte przejście:**

   - Porównujemy 3 i 2. Zamieniamy miejscami.
     [2, 3, 4, 5, 8]

Zbior jest teraz posortowany.

---

## Złożoność obliczeniowa

### Czasowa

- **Najlepszy przypadek:** O(n)
  - W przypadku, gdy zbior jest już posortowany, algorytm wykonuje jedno przejście bez żadnych zamian.
- **Przeciętny przypadek:** O(n^2)
  - Dla losowych danych każdy element jest wielokrotnie porównywany i zamieniany.
- **Najgorszy przypadek:** O(n^2)
  - W przypadku odwrotnie posortowanego zbioru liczba porównań i zamian jest maksymalna.

### Pamięciowa

Bubble Sort jest algorytmem **in-place**, co oznacza, że nie wymaga dodatkowej przestrzeni pamięci oprócz tej, która jest potrzebna do przechowywania danych wejściowych. Jego złożoność pamięciowa wynosi O(1).

---

## Zalety i wady

### Zalety

1. **Prostota:**
   - Algorytm jest łatwy do zrozumienia i zaimplementowania, co czyni go doskonałym narzędziem edukacyjnym.
2. **Stabilność:**
   - Bubble Sort zachowuje kolejność równych elementów, co może być ważne w pewnych zastosowaniach.
3. **Minimalne wymagania pamięciowe:**
   - Nie wymaga dodatkowej pamięci poza oryginalnym zbiorem danych.

### Wady

1. **Niska wydajność:**
   - Algorytm jest bardzo nieefektywny dla dużych zbiorów danych.
2. **Wysoka liczba operacji:**
   - Nawet w przypadkach, gdy dane są prawie posortowane, algorytm wykonuje zbędne operacje porównywania i zamiany.

---

## Zastosowania

Bubble Sort jest rzadko stosowany w rzeczywistych aplikacjach ze względu na swoją niską wydajność. Jednak może być przydatny w następujących przypadkach:

1. **Edukacja:**
   - Bubble Sort jest często wykorzystywany jako pierwszy algorytm sortowania w kursach programowania ze względu na jego prostotę.
2. **Małe zbiory danych:**
   - Może być stosowany dla małych zbiorów danych, gdzie jego prostota przeważa nad niską wydajnością.
3. **Analiza stabilności algorytmów:**
   - Jako stabilny algorytm może być używany do demonstrowania tej cechy.

---

## Implementacja w Pythonie

Poniższy kod przedstawia prostą implementację Bubble Sort w Pythonie:

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Flaga optymalizacyjna
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        # Jeśli nie było zamian, zakończ sortowanie
        if not swapped:
            break

# Przykład użycia
array = [64, 34, 25, 12, 22, 11, 90]
print("Przed sortowaniem:", array)
bubble_sort(array)
print("Po sortowaniu:", array)
```

---

## Podsumowanie

Bubble Sort to prosty, ale nieskuteczny algorytm sortowania, który najlepiej sprawdza się w nauce podstaw programowania i algorytmiki. Chociaż nie jest używany w aplikacjach produkcyjnych, jego zrozumienie pomaga w opanowaniu bardziej zaawansowanych algorytmów sortowania i analizy złożoności obliczeniowej.


