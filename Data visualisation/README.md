# Analiza pietei imobiliare - Sector 2

Acest proiect este un notebook Jupyter in Python in care am analizat date despre achizitiile de imobiliare din Sector 2, Bucuresti, pentru anul 2023.  
Datele se gasesc in fisierul `imobiliare-2023.csv` si contin informatii precum tipul proprietatii, strada, suprafata, pretul tranzactiei, sursa de finantare si data tranzactiei.  

## Ce am facut in proiect
- Importul fisierului CSV folosind Pandas si filtrarea datelor pentru anul 2023.  
- Curatarea datelor si transformarea acestora:
  - conversia valorilor numerice,
  - combinarea diferitelor suprafete intr-o singura coloana,
  - traducerea coloanelor in engleza pentru claritate,
  - adaugarea coloanelor **Luna** si **Sezon**.  
- Corectarea denumirilor de strazi pentru a permite geocodarea.  
- Geocodarea strazilor folosind Geopy pentru a obtine latitudine si longitudine.  
- Crearea de vizualizari interactive cu Plotly:
  - scatter plot pret vs. suprafata,
  - trendline pentru preturi,
  - grafice pe sezoane,
  - harta interactiva cu tranzactiile imobiliare,
  - pie chart cu totalul valorii tranzactiilor pe anotimpuri.

## Structura proiectului
- `imobiliare-2023.csv` – dataset cu tranzactiile imobiliare din Sector 2 pe 2023.  
- `imobiliare2023sect2.ipynb` – notebook Jupyter cu codul si vizualizarile.  

## Tehnologii folosite
- Pandas  
- Plotly  
- Geopy  

## Concluzii
Proiectul arata cum se pot transforma date brute intr-o analiza vizuala, relevand tendinte si pattern-uri in piata imobiliara din Sector 2: sezonalitate, legatura intre suprafata si pret, zone cu tranzactii mai scumpe etc.
