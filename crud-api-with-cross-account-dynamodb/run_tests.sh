export STAGE_LOCATION=https://kgsnw1ldx7.execute-api.us-east-1.amazonaws.com/prod/

echo Create a user:

        curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"id": "unique001", "firstName": "Alice", "lastName": "Smith", "color": "blue"}' \
        ${STAGE_LOCATION}/users

echo List users:

        curl ${STAGE_LOCATION}/users

echo Read a user:

        curl ${STAGE_LOCATION}/users/unique001

echo Update a user:

        curl --header "Content-Type: application/json" \
        --request PUT \
        --data '{"firstName": "Alice", "lastName": "Smith", "color": "green"}' \
        ${STAGE_LOCATION}/users/unique001

echo Delete a user:

        curl --request DELETE ${STAGE_LOCATION}/users/unique001