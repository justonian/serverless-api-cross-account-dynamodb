const AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB()


// Create the STS service object    
var sts = new AWS.STS({apiVersion: '2011-06-15'});

//Assume Role

let lastCredential = {count: 0};

async function setCreds() {
  if (!process.env.ROLE_ARN)return;
  var roleToAssume = {RoleArn: process.env.ROLE_ARN,
                    RoleSessionName: 'session1',
                    DurationSeconds: 900,};
  if (lastCredential.data) {
    // Check if credentials are expired and have some buffer of a defined number of seconds
    let expiration = new Date(lastCredential.data.Credentials.Expiration);
    let now = new Date();
    let epsilonSeconds = 5;
    if (expiration.getTime() - now.getTime() >= 1000 * epsilonSeconds) return;
  }
  let data = await sts.assumeRole(roleToAssume).promise();
  let roleCreds = {accessKeyId: data.Credentials.AccessKeyId,
              secretAccessKey: data.Credentials.SecretAccessKey,
              sessionToken: data.Credentials.SessionToken};
  lastCredential.data = data;
  lastCredential.count++;
  dynamodb.config.update({
    accessKeyId: roleCreds.accessKeyId,
    secretAccessKey: roleCreds.secretAccessKey,
    sessionToken: roleCreds.sessionToken
  });   
}

async function getDynamo() {
  await setCreds();
  return dynamodb;
}

module.exports = {
  getDynamo,
  lastCredential,
}
