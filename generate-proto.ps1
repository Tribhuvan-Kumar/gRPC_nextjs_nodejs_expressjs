protoc `
  --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd `
  --ts_proto_out=./proto-types `
  --ts_proto_opt=outputServices=grpc-js `
  --ts_proto_opt=esModuleInterop=true `
  proto/hello.proto
