Currency-Converter

This project is a currency converter which uses: HTML, CSS and Vue.js.

The currency information is pulled from the API Frankfurter.dev to get currency exchange information.

In the application itself. There's two inputs: 
1 - From Currency
2 - To Currency

The to currency section is readonly as it will display the calculated exchange. Upon start-up, they're defaulted with from = CAD (Canadian Dollar) and to = USD (US Dollar).

Beside the inputs will be a flag icon (pulled from the API FlagCDN), if the user clicks the flag a popup modal will appear and the user can search for a new currency to select. Currencies can be searched by either the name of the currency (e.g. Japanese Yen), or the currency code (e.g. JPY for Japanese Yen). The only thing is if the user searches for the currency already selected, it will not show up in the search query.

The user then can enter a value in the input field for how much in the "from" currency to convert, when the user clicks the "Convert" button, it'll do the calculation and display on the bottom of the page, as well as showing how much 1 unit of the from currency = x amount of the to currency.

There's also a button in the center of the inputs, to swap the currencies. If the user already pressed convert, then clicks this swap button it will swap the currencies, and run the calculation again. Otherwise, it will just swap the currencies around.
