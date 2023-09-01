# Terrific Tacos
A project that demonstrates the concepts behind event sourcing written in TypeScript

Install the packages

```bash
npm install
```

Run the client

```bash
npm start
```

Running a workflow

```bash
 curl -X POST -H "Content-Type: application/json" -d '{"timeStamp":null,"name":"orderSubmitted","order":{"_orderItems":[{"description":"Tamale","price":3,"quantity":9,"total":35}],"_customer":{"firstName":"Kaylee","lastName":"Lang","email":"Kaylee.Lang@email.com"}},"restaurant":"Tommys Taco"}' http://localhost:3000/signal
```
