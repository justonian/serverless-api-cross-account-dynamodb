const { getDynamo, lastCredential } = require("/opt");

exports.handler = async message => {
  let dynamodb = await getDynamo();
  console.log(message);
  let userId = message.pathParameters.id
  let params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: { S: userId }
    }
  };

  console.log(`Getting user ${userId} from table ${process.env.TABLE_NAME}`);
  let results = await dynamodb.getItem(params).promise()
  console.log(`Done: ${JSON.stringify(results)}`);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({...results.Item, lastCredential})
  };
}
