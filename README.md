# 🚀 gRPC Experiment — Next.js (Edge) ↔ Node.js (Express)

This project is an experimental setup where I explore using **gRPC** for communication between a **Next.js server (Edge Runtime)** and a **Node.js + Express backend**.

gRPC is normally designed for **server-to-server** communication, but in this project I tried to see how far I could push it with a modern frontend framework like Next.js.

---

## 📌 Project Structure

```
root/
 ├── client/      # Next.js 16 (Edge Runtime)
 ├── server/      # Node.js + Express (gRPC server)
 ├── proto/       # .proto definition files
 ├── generate-proto.ps1   # Script to generate gRPC client & server stubs
 └── package.json
```

---

## 🎯 Goal of This Project

* Understand how **gRPC works internally**
* Test gRPC communication between:

  * **Next.js (Edge server)** → **Node.js gRPC server**
* Compare the behavior with REST
* Experiment with sending **large messages**, **text payloads**, and observing performance differences

---

## ⚡ Why gRPC Here?

gRPC is optimized for:

* server-to-server communication
* low latency
* binary data
* strongly-typed contracts (via `.proto` files)
* high-performance microservices

It's **NOT designed** for browser or edge runtimes.
But this project explores **"What if we try?"**

---

## 🛠️ Tech Stack

### **Client (Next.js)**

* Next.js 16
* Edge Runtime (middleware / server components)
* gRPC-Web (experiment)
* TypeScript

### **Server (Node.js + Express)**

* Express.js
* @grpc/grpc-js
* Protocol Buffers
* TypeScript

---

## 📡 How It Works

1. You write your contract in `./proto/message.proto`
2. Run the generator script:

```
npm run generate:proto
```

3. This generates stubs for:

   * Node.js (server)
   * JavaScript/TS (client)

4. Next.js calls gRPC client → sends text payload

5. Express server responds:

Example:

```
Hi <your-text>
```

---

## ▶️ Running the Project

### **Start the gRPC Server**

```
cd server
npm install
npm run dev
```

### **Start the Next.js Client**

```
cd client
npm install
npm run dev
```

---

## 🧪 Test Example

Send any text from the client:

```
Lorem ipsum dolor sit amet...
```

The gRPC server replies:

```
Hi Lorem ipsum dolor sit amet...
```

Both REST and gRPC responses can be compared for:

* speed
* payload size
* overhead
* serialization format

---

## 🔍 Findings / Observations

* gRPC works flawlessly between **Node → Node**
* Next.js Edge Runtime has limitations because:

  * It doesn’t support raw TCP connections
  * gRPC depends on HTTP/2 persistent connections
* Need gRPC-Web or a proxy for real browser usage
* Still, it's possible to experiment and understand constraints

---

## 📦 Future Improvements (Optional)

* Add Envoy / gRPC-Web proxy
* Add UI comparison dashboard (REST vs gRPC)
* Add streaming examples:

  * Server streaming
  * Client streaming
  * Bidirectional streaming

---

## 🙌 Conclusion
This project isa **learning experiment** to understand how gRPC behaves outside its ideal environment. Even though gRPC is meant for backend systems, exploring its limits with Next.js helps understand performance patterns, protocol differences, and modern app architecture.

