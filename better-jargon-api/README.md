# better-jargon-api
A simple web service to look up word definitions

# Getting Started
To start the service:
1. `cd better-jargon-api`
2. `./gradlew bootRun`
 
# Define a word
To define the word `TCP`, do:
1. curl -X GET http://localhost:8080/api/v1/words/tcp
```
{
    "id": "ede6df46-0041-4bb1-88bd-eeaef04afc49",
    "word": "TCP",
    "url": "https://www.betterment.com/resources/introducing-tax-coordinated-portfolio",
    "short_definition": "Tax Coordinated Portfolio",
    "long_definition": "A feature that automates a strategy called asset location. It starts by placing your assets that will be taxed highly in your IRAs, which have big tax breaks. Then, it places your lower-taxed assets in your taxable accounts. Only Betterment’s Retirement goal can use TCP."
}
```

