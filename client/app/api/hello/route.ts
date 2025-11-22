import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(process.cwd(), "../proto/hello.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
});

const grpcObj = grpc.loadPackageDefinition(packageDef) as any;
const helloPackage = grpcObj.hello;

// Create gRPC client
const client = new helloPackage.HelloService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export async function GET() {
  return new Promise((resolve) => {
    client.SayHello({ name: "Trii" }, (err: any, response: any) => {
      if (err) {
        return resolve(
          new Response(JSON.stringify({ error: err.message }), { status: 500 })
        );
      }
      resolve(new Response(JSON.stringify(response), { status: 200 }));
    });
  });
}
