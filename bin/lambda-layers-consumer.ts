#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LambdaLayersConsumerStack } from "../lib/lambda-layers-consumer-stack";

const service = "lambda-layers-consumer";
let stage;
const app = new cdk.App();

stage = "m";
new LambdaLayersConsumerStack(app, `${service}-${stage}`, {
  tags: {
    service,
    stage,
  },
});

stage = "d";
new LambdaLayersConsumerStack(app, `${service}-${stage}`, {
  tags: {
    service,
    stage,
  },
});
