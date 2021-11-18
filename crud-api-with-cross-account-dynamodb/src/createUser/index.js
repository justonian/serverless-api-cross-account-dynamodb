
const { getDynamoClient } = require("dynamoCrossAccountClient");

exports.handler = async (message, context) => {

  console.log(message);

  if (message.body) {
    let user = JSON.parse(message.body);
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: user.id },
        FirstName: { S: user.firstName },
        LastName: { S: user.lastName },
        FavoriteColor: { S: user.color }
      }
    };

    console.log(`Adding user to table ${process.env.TABLE_NAME}`);
    try {
      let dynamodb = await getDynamoClient(context);
      await dynamodb.putItem(params).promise()
    } catch (err) {
      return {
        statusCode: 500,
        headers: {},
        body: JSON.stringify({message: err.message})
      };
    }
    console.log(`User added to table, done`);
  }

  return {};
}
