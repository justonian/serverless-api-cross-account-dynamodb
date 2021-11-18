const { getDynamo } = require("/opt");

exports.handler = async message => {
  let dynamodb = await getDynamo();
  console.log(message);

  let params = {
    TableName: process.env.TABLE_NAME,
    Select: 'ALL_ATTRIBUTES'
  };

  console.log(`Getting all users from table ${process.env.TABLE_NAME}`);
  let results = await dynamodb.scan(params).promise()
  console.log(`Done: ${JSON.stringify(results)}`);

  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(results.Items)
  };
}
