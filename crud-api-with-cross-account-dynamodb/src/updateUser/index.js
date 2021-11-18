const { getDynamo } = require("/opt");

exports.handler = async message => {
  console.log(message);
  let dynamodb = await getDynamo();
  if (message.body) {
    let userId = message.pathParameters.id
    let user = JSON.parse(message.body);
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: userId },
        FirstName: { S: user.firstName },
        LastName: { S: user.lastName },
        FavoriteColor: { S: user.color }
      }
    };

    console.log(`Updating user ${userId} in table ${process.env.TABLE_NAME}`);
    await dynamodb.putItem(params).promise()
    console.log(`User added to table, done`);
  }

  return {
    statusCode: 204,
    headers: {},
    body: JSON.stringify({})
  };
}
