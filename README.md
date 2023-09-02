# Terrific Tacos
A project that demonstrates the concepts behind event sourcing written in TypeScript

Install the packages

```bash
npm install
```

Run the web server

```bash
npm start
```

Running a workflow

You can create a `curl` command line that executes an `orderSubmitted` signal by executing:

```text
npm run gensignal
```

You'll get output similar to the following:


```bash
curl -X POST -H "Content-Type: application/json" -d '{"id":null,"timeStamp":null,"name":"orderSubmitted","restaurant":"Terrific Tacos","order":{"orderItems":[{"description":"Tamale","price":3.99,"quantity":4},{"description":"Little Fish Taco","price":1.99,"quantity":7},{"description":"Big Chicken Taco","price":4.99,"quantity":1},{"description":"Breakfast Burrito","price":9.99,"quantity":4}],"customer":{"firstName":"Clark","lastName":"Armstrong","email":"Clark.Armstrong@email.com"},"id":"d1180a23-fe97-4e2e-9545-e9677442deb3"}}' http://localhost:3000/signal


```

Enter that output in terminal window separate from where the Web Server is running.
