import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "../../../proto/hello.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef) as any;
const helloPackage = grpcObj.hello;

const server = new grpc.Server();

server.addService(helloPackage.HelloService.service, {
  SayHello: (call: any, callback: any) => {
    console.log("Received request:", call.request);
    const name = call.request.name;
    callback(null, { message: `Hello, ${name}!` });
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("🚀 gRPC Server running on port 50051");
    server.start();
  }
);
