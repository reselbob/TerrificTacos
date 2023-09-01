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
 curl -X POST -H "Content-Type: application/json" -d '{"timeStamp":null,"name":"orderSubmitted","order":{"orderItems":[{"description":"Tamale","price":3.19,"quantity":9}],"customer":{"firstName":"Kaylee","lastName":"Lang","email":"Kaylee.Lang@email.com"}},"restaurant":"Terrific Tacos"}' http://localhost:3000/signal
```
