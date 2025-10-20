const { createApp } = Vue;

createApp({
    data() {
        return {
            currencies: [],
            fromCurrency: { code: 'CAD', name: 'Canadian Dollar', flag: 'https://flagcdn.com/48x36/ca.png'},
            toCurrency: { code: 'USD', name: 'US Dollar', flag: 'https://flagcdn.com/48x36/us.png' },
            fromAmount: '',
            toAmount: '',
            exchangeRate: 0,
            showModal: false,
            modalType: '',
            searchQuery: '',
            showResult: false,
            loading: false
        };
    },
    computed: {
        filteredCurrencies() {
            const selected = [this.fromCurrency.code, this.toCurrency.code];
            return this.currencies
            .filter(c => !selected.includes(c.code))
            .filter (c =>
                c.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async loadCurrencies() {
            this.currencies = await CurrencyData.fetchCurrencies();
        },
        openModal(type) {
            this.modalType = type;
            this.showModal = true;
            this.searchQuery = '';
        },
        closeModal() {
            this.showModal = false;
        },
        selectCurrency(currency) {
            if (this.modalType === 'from') {
                this.fromCurrency = currency;
            } else {
                this.toCurrency = currency;
            }
            this.closeModal();
            this.clearResult();
        },
        async convertCurrency() {
            if (!this.fromAmount || this.fromAmount <= 0) return;

            this.loading = true;
            this.showResult = false;

            const rate = await CurrencyData.getExchangeRate(this.fromCurrency.code, this.toCurrency.code);

            if (rate) {
                this.exchangeRate = rate;
                this.toAmount = (parseFloat(this.fromAmount) * rate).toFixed(2);
                this.showResult = true;
            }
            this.loading = false;
        },
        swapCurrencies() {
            const temp = this.fromCurrency;
            this.fromCurrency = this.toCurrency;
            this.toCurrency = temp;

            if (this.toAmount) {
                this.fromAmount = this.toAmount;
                this.convertCurrency();
            }
        },
        clearResult() {
            this.showResult = false;
            this.toAmount = '';
        },

        formatNumber(num) {
            return parseFloat(num).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    },
    mounted() {
        this.loadCurrencies();
    }
}).mount('#app');