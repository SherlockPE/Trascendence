
## This script uses the GitHub GraphQL API to fetch details about a specific project.



curl --request POST   --url https://api.github.com/graphql \
 --header "Authorization: Bearer $GITHUB_TOKEN" \
  --data '{"query":"query{ node(id: \"PVT_kwHOBjZP5s4AxfZu\") { ... on ProjectV2 { fields(first: 20) { nodes { ... on ProjectV2Field { id name } ... on ProjectV2FieldCommon { id name } ... on ProjectV2IterationField { id name configuration { iterations { startDate id }}} ... on ProjectV2SingleSelectField { id name options { id name }}}}}}}"}' > out.json





curl --request POST \
  --url https://api.github.com/graphql \
  --header "Authorization: Bearer $GITHUB_TOKEN" \
  --data '{"query":"query{ node(id: \"PVT_kwHOBjZP5s4AxfZu\") { ... on ProjectV2 { items(first: 20) { nodes{ id fieldValues(first: 8) { nodes{ ... on ProjectV2ItemFieldTextValue { text field { ... on ProjectV2FieldCommon { name }}} ... on ProjectV2ItemFieldDateValue { date field { ... on ProjectV2FieldCommon { name } } } ... on ProjectV2ItemFieldSingleSelectValue { name field { ... on ProjectV2FieldCommon { name }}}}} content{ ... on DraftIssue { title body } ...on Issue { title comments(first: 20) { nodes { author { login } body createdAt } } assignees(first: 10) { nodes{ login }}} ...on PullRequest { title assignees(first: 10) { nodes{ login }}}}}}}}}"}'



  
curl --request POST \
  --url https://api.github.com/graphql \
  --header "Authorization: Bearer $GITHUB_TOKEN" \
  --data '{"query":"query{ node(id: \"PVT_kwHOBjZP5s4AxfZu\") { ... on ProjectV2 { teams(first: 10) { nodes { name members(first: 10) {   nodes {login name} }   } } }} }"}' > colaborators.json

curl -X POST https://api.github.com/graphql \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { projectV2(id: \"PVT_kwHOBjZP5s4AxfZu\") { teams(first: 10) { nodes { name members { nodes { login name } } } } } }"
  }'
