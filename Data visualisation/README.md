# Real Estate Market Analysis - Sector 2

This project is a Python Jupyter notebook in which we analyzed data on real estate purchases in Sector 2, Bucharest, for the year 2023.
The data is found in the file `imobiliare-2023.csv` and contains information such as property type, street, area, transaction price, financing source and transaction date.

## What we did in the project
- Importing the CSV file using Pandas and filtering the data for the year 2023.
- Cleaning the data and transforming it:
- converting numeric values,
- combining different areas into a single column,
- translating the columns into English for clarity,
- adding the **Month** and **Season** columns.
- Correcting street names to allow geocoding.
- Geocoding the streets using Geopy to obtain latitude and longitude.
- Creating interactive visualizations with Plotly:
- scatter plot price vs. area,
- trendline for prices,
- graphs by seasons,
- interactive map with real estate transactions,
- pie chart with the total value of transactions by season.

## Project structure
- `imobiliare-2023.csv` – dataset with real estate transactions in Sector 2 for 2023.
- `imobiliare2023sect2.ipynb` – Jupyter notebook with the code and visualizations.

## Technologies used
- Pandas
- Plotly
- Geopy

## Conclusions
The project shows how raw data can be transformed into a visual analysis, highlighting trends and patterns in the real estate market in Sector 2: seasonality, the relationship between area and price, areas with more expensive transactions, etc.
