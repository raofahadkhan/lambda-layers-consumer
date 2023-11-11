import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaLayersConsumerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { service, stage } = props?.tags!;

    const userTable = new dynamodb.Table(this, `${service}-${stage}-user-table`, {
      tableName: `${service}-${stage}-user-table`,
      partitionKey: {
        name: "user_id",
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const layer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      `${service}-${stage}-layer`,
      `arn:aws:lambda:us-east-1:015783570782:layer:lambda-layers-${stage}-layer:1`
    );

    const lambdaLayersConsumer = new lambda.Function(this, `${service}-${stage}-lambda`, {
      functionName: `${service}-${stage}-lambda`,
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"), // Adjust the path of the code
      layers: [layer],
    });

    userTable.grantFullAccess(lambdaLayersConsumer);
  }
}
