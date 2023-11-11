// import axios from "axios";
const axios = require("axios");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: any) => {
  const params = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      user_id: "1",
      name: "Fahad",
      age: 25,
      email: "raofahad046@gmail.com",
      addresses: "I will have multiple addressess",
      isStudent: true,
    },
  };

  try {
    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: "User Created Successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
};
