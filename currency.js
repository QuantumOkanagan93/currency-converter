const CurrencyData = {
    async fetchCurrencies() {
        try {
            const response = await fetch('https://api.frankfurter.dev/v1/currencies');
            const data = await response.json();

            const countryCodeMap = {
                'AUD': 'au',
                'BGN': 'bg',
                'BRL': 'br',
                'CAD': 'ca',
                'CHF': 'ch',
                'CNY': 'cn',
                'CZK': 'cz',
                'DKK': 'dk',
                'EUR': 'eu',
                'GBP': 'gb',
                'HKD': 'hk',
                'HUF': 'hu',
                'IDR': 'id',
                'ILS': 'il',
                'INR': 'in',
                'ISK': 'is',
                'JPY': 'jp',
                'KRW': 'kr',
                'MXN': 'mx',
                'MYR': 'my',
                'NOK': 'no',
                'NZD': 'nz',
                'PHP': 'ph',
                'PLN': 'pl',
                'RON': 'ro',
                'SEK': 'se',
                'SGD': 'sg',
                'THB': 'th',
                'TRY': 'tr',
                'USD': 'us',
                'ZAR': 'za'
            };

            const currencies = Object.entries(data).map(([code, name]) => ({
                code: code,
                name: name,
                flag: `https://flagcdn.com/48x36/${countryCodeMap[code]}.png`
            }));

            return currencies;
        } catch(error) {
            console.error('Error fetching currencies:', error);
            return [];
        }
    },

    async getExchangeRate(from, to, amount=1) {
        try {
            const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
            const data = await response.json();
            return data.rates[to];
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            return null;
        }
    }
};