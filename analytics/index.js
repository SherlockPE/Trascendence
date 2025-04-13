require("dotenv").config();
const fs = require('fs');

// 🔒 Reemplaza con tu token de GitHub personal con scope `read:project`
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const query = `query {
  node(id: "PVT_kwHOBjZP5s4AxfZu") {
    ... on ProjectV2 {
      items(first: 53) {
        nodes {
          id
          fieldValues(first: 8) {
            nodes {
              ... on ProjectV2ItemFieldTextValue {
                text
                field {
                  ... on ProjectV2FieldCommon {
                    name
                  }
                }
              }
              ... on ProjectV2ItemFieldDateValue {
                date
                field {
                  ... on ProjectV2FieldCommon {
                    name
                  }
                }
              }
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field {
                  ... on ProjectV2FieldCommon {
                    name
                  }
                }
              }
            }
          }
          content {
            ... on Issue {
              title
                parent {
                    title
                }
              comments(first: 20) {
                nodes {
                  author {
                    login
                  }
                  body
                  createdAt
                }
              }
              assignees(first: 10) {
                nodes {
                  login
                  name
                }
              }
            }
            ... on PullRequest {
              title
              assignees(first: 10) {
                nodes {
                  login
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`;


async function fetchProjectItems() {
    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });
    const data = await response.json();

    if (data === null || data === undefined) {
        console.error("No data received from GitHub API.");
        return;
    }
    const items = data.data.node.items.nodes;
    let relationTask = {

    };
    let stats = {
        module: [{
            moduleName: "web",
            totalTasks: 0,
            participants: [],
            ownerships: [],
            tasks: [],
        }]
    };
    let userTasks = [{
        login: "Adrian-REH",
        modules: []
    },{
        login: "SherlockPE",
        modules: []
    },{
        login: "albartol",
        modules: []
    },{
        login: "cacharri",
        modules: []
    },{
        login: "grey-ssy",
        modules: []
    }];

    const itemMap = new Map();
    const childrenMap = new Map();
    const filtrados = items.filter((item) => {
        const field = item.fieldValues.nodes.filter(
            (fieldValue) => fieldValue.field?.name === "type" || fieldValue.field?.name === "Module"
        );

        return field.length > 0;
    }).map((item) => {
        let moduleItem = {
            moduleName: "",
            totalTasks: 0,
            participants: [],
            ownerships: [],
            tasks: []
        };


        let typeField = {};
        let moduleField = {};
        let issue = {};
        const fields = item.fieldValues.nodes.filter(
            (fieldValue) => {
                if (fieldValue.field?.name === "Module") {
                    moduleField = (fieldValue);
                    moduleItem.moduleName = fieldValue.name;
                }
                if (fieldValue.field?.name === "type")
                    typeField = (fieldValue);
                return fieldValue.field?.name === "type" || fieldValue.field?.name === "Module"
            }
        );
        if (moduleItem.moduleName === "") {
            return null;
        }

        if (typeField.name === 'Epic' && item.content?.assignees?.nodes.length > 0) {
            moduleItem.totalTasks += 1;
            item.content?.assignees?.nodes.forEach((assignee) => {
                if (!moduleItem.participants.includes(assignee.login)) {
                    moduleItem.participants.push(assignee.login);
                }
            });
            moduleItem.tasks.push({ title: item.content?.title, assignees: item.content?.assignees?.nodes.length });
        } else if (typeField.name === 'Ownership') {
            item.content?.assignees?.nodes.forEach((assignee) => {
                if (!moduleItem.ownerships.includes(assignee.login)) {
                    moduleItem.ownerships.push(assignee.login);
                }

            });
        }


        

        let task = {
            title:"",
            assignees: 0,
            child: {
                title: "",
                assignees: 0,
            }
        };
        //Para Stats
        stats.module.forEach((module) => {
            if (moduleItem.moduleName != undefined && module.moduleName === moduleItem.moduleName && 
                 moduleItem.totalTasks > 0
            ) {
                module.totalTasks += moduleItem.totalTasks;

                module.tasks.push({ title: item.content?.title, assignees: item.content?.assignees?.nodes.length, parent: item.content?.parent?.title });
            }
        });
        const normalize = (str) => str?.toLowerCase().trim();

        if (!stats.module.some(module => 
            normalize(module.moduleName) === normalize(moduleItem.moduleName)
        )) {
            stats.module.push(moduleItem);
        }

        //Para UserTasks
        userTasks.forEach((userTask) => {
            userTask.modules.forEach((module) => {
                if (!moduleItem.participants.includes(userTask.login))
                    return;
                if (moduleItem.moduleName != undefined && module.moduleName === moduleItem.moduleName) {
                    module.totalTasks += moduleItem.totalTasks;
                    module.tasks.push({ title: item.content?.title, assignees: item.content?.assignees?.nodes.length, parent: item.content?.parent?.title });
                }
            });
            const normalize = (str) => str?.toLowerCase().trim();

            if (!userTask.modules.some(module => 
                normalize(module.moduleName) === normalize(moduleItem.moduleName)
            ) && moduleItem.participants.includes(userTask.login)) {
                userTask.modules.push(moduleItem);
            }
        });
        itemMap.set(item.content?.title, { title: item.content?.title, assignees: item.content?.assignees?.nodes.length, child: {} });

        return {
            title: item.content?.title,
            totalAssignees: item.content?.assignees?.nodes.length,
            fields: fields,
            assignees: item.content?.assignees?.nodes,
        };
    });
    const childrenSet = new Set();

    items.forEach((item) => {
        const title = item.content?.title;
        const parentTitle = item.content?.parent?.title;
        if (title && parentTitle && itemMap.has(parentTitle)) {
          const parent = itemMap.get(parentTitle);
          parent.child = itemMap.get(title);
          childrenSet.add(title);
        }
    });

    const roots = items
    .filter((item) => !childrenSet.has(item.content?.title))
    .map((item) => itemMap.get(item.content?.title))
    .filter((item) => item.title !== undefined);

    if (data.errors) {
        console.error("GraphQL Errors:", data.errors);
    } else {
        fs.writeFileSync('stats.json', JSON.stringify(stats, null, 2), 'utf8');


        console.log("---------------------------------");
/*         console.log("---------------------------------");
        userTasks.map((userTask) => {
            userTask.modules = userTask.modules.map((module) => {
                return module.totalTasks > 0 ? module: null;
            });
            return userTask;
        }); */
        fs.writeFileSync('userTasks.json', JSON.stringify(userTasks, null, 2), 'utf8');

        fs.writeFileSync('items.json', JSON.stringify(roots, null, 2), 'utf8');
        //console.log(JSON.stringify(data, null, 2)); // pretty-print
    }
}

fetchProjectItems();
