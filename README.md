# jfk-1-parser-regexp

WYSZUKIWANIE KODÓW POCZTOWYCH

suma, różnica, iloczyn

-wstawiamy dwa pliki, po czym wstawiamy znak
-możemy użyć SUBMIT lub wstawić kolejne 1 lub 2 pliki
-zapętlamy działania


bugs:
nie można wstawić dwóch znaków po sobie: np.
(plik1+plik2)*(plik3+plik4) = plik1 plik2 + plik3 plik4 + *

w takim przypadku należy najpierw wstawić
plik1 plik2 + plik3 plik4 + 
a następnie *
