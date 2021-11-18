const { getDynamo } = require("/opt");

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

  console.log(`Deleting user ${userId} from table ${process.env.TABLE_NAME}`);
  let results = await dynamodb.deleteItem(params).promise()
  console.log(`Done: ${JSON.stringify(results)}`);

  return {
    statusCode: 204,
    headers: {},
    body: JSON.stringify({})
  };
}
