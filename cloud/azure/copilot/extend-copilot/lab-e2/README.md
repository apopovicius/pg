# Integrating an API with copilot agent

## Create the API and run it

Our API is based on AZURE functions and Azure data-tables.

Flow: 
- **npm install**
- create in **env** folder the *env.local.user* file and add *SECRET_STORAGE_ACCOUNT_CONNECTION_STRING=UseDevelopmentStorage=true* to it
- go to **Teams Toolkit** and lunch from **Environment** section the API. Choose **local** item and click **debug button**
- go to **http** folder and play with the API from the .http file(this requires humao.rest-client vscode extensio so that it can run)
- if you want to debug your API you can select **attach to backend** from the debugging bar started on your vscode editor and you can set any breakpoint in code you want


## API code

The API code is on **src** folder. Here we can find 3 folders: 
- **functions**: this are the handlers of the API requests basically being the starting point and the responder for the API
- **model**: this describes the data models used in this apis and the response, request objects used in the interaction with this API
- **service**: this are the API service implementation used in the Azure functions classes

In order to connect your API calls to specific function handler you will need the following code as bellow. Here the **me** Azure function ties to the *GET* and *POST* methods from our API. 

```typescript
app.http("me", {
  methods: ["GET","POST"],
  authLevel: "anonymous",
  route: "me/{*command}",
  handler: me,
});
```

**Consultants** functions and services works the same as the **me** function


## Other utilities
In order to create your Azure data-tables there is a folder called **scripts**. This contains the scripts necesary to setup the db(**db-setup**) and some json  files(**db/*.json**) to populate with some data.

## API plugin

```json
{
    "$schema": "https://aka.ms/json-schemas/copilot-extensions/vNext/declarative-copilot.schema.json",
    "version": "v1.0",
    "name": "Trey Genie Local",
    "description": "You are a handy assistant for consultants at Trey Research, a boutique consultancy specializing in software development and clinical trials. ",
    "instructions": "Greet users in a professional manner, introduce yourself as the Trey Genie, and offer to help them. Always remind users of the Trey motto, 'Always be Billing!'. Your main job is to help consultants with their projects and hours. Using the TreyResearch action, you are able to find consultants based on their names, project assignments, skills, roles, and certifications. You can also find project details based on the project or client name, charge hours on a project, and add a consultant to a project. If a user asks how many hours they have billed, charged, or worked on a project, reword the request to ask how many hours they have delivered. In addition, you may offer general consulting advice. If there is any confusion, encourage users to speak with their Managing Consultant. Avoid giving legal advice.",
    "conversation_starters": [
        {
            "title": "Find consultants",
            "text": "Find consultants with TypeScript skills"
        },
        {
            "title": "My Projects",
            "text": "What projects am I assigned to?"
        },
        {
            "title": "My Hours",
            "text": "How many hours have I delivered on projects this month?"
        }
    ],
    "capabilities": [
        {
            "name": "OneDriveAndSharePoint",
            "items_by_url": [
                {
                    "url": "${{SHAREPOINT_DOCS_URL}}"
                }
            ]
        }
    ],
    "actions": [
        {
            "id": "treyresearch",
            "file": "trey-plugin.json"
        }
    ]
}
```

> The **actions** section tells the declarative agent to access the Trey Research API. **try-plugin.json** is the open-api describing the API to Copilot so that it can make the REST calls. 


These two files are used to describe your API to Copilot:
- **appPackage/trey-definition.json**: as mentioned above this is the OPENAPI Specification([OAS](https://swagger.io/specification/)) or swagger file describing the API
- **appPackage/trey-plugin.json**: this file contains all the Copilot-specific details that aren't described in OAS file.


### trey-definition.json

> **servers**: this section describes the server URL; Teams Toolkit will create a [developer tunnel](https://learn.microsoft.com/en-gb/azure/developer/dev-tunnels/) to expose your local API on the internet, and replace the token **"${OPENAPI_SERVER_URL}}** with the public URL. It then goes on the describe every resourse path, verb, parameter in the API. Notice the detailed *descriptions*; these are important to help Copilot understand how the API is to be used


### try-plugin.json

This file has the Copilot-specific details. This includes breaking the API calls down into functions which can be called when Copilot has a particular use case. For example, all *GET* requests for */consultants* look up on or more consultants with various parameter options, and they are grouped into a function **getConsultants**

```json
"functions": [
    {
      "name": "getConsultants",
      "description": "Returns detailed information about consultants identified from filters like name of the consultant, name of project, certifications, skills, roles and hours available. Multiple filters can be used in combination to refine the list of consultants returned",
      "capabilities": {
        "response_semantics": {
          "data_path": "$.results",
          "properties": {
            "title": "$.name",
            "subtitle": "$.id",
            "url": "$.consultantPhotoUrl"
          }
        }
      }
    },
```

Scrolling down you can find the runtime settings that include a pointer to the **trey-definition.json** file, and an enumeration of the available functions.

```json
"runtimes": [
    {
      "type": "OpenApi",
      "auth": {
        "type": "None"
      },
      "spec": {
        "url": "trey-definition.json"
      },
      "run_for_functions": [
        "getConsultants",
        "getUserInformation",
        "postBillhours"
      ]
    }
  ],
```

## Add declarative agent to your app manifest file
In your **manifest.json** file add an other section to include the declarative agent

```json
  "copilotAgents": {
    "declarativeAgents": [
      {
        "id": "treygenie",
        "file": "trey-declarative-agent.json"
      }
    ]
  }
```

You can remove from manifest some section that are not needed anymore to run the agent with an API

```
"staticTabs": [
    {
      "entityId": "index",
      "name": "Copilot Camp",
      "contentUrl": "https://microsoft.github.io/copilot-camp/",
      "websiteUrl": "https://microsoft.github.io/copilot-camp/",
      "scopes": [
        "personal"
      ]
    }
  ],
  "validDomains": [
    "microsoft.github.io"
  ]
```

# Troubleshoot your API plugin

To enable developer mode enter this prompt into Copilot: **-developer mode**
Then when you issue a prompt, Copilot will include an adaptive car at the end of its response with the words **Show plugin developer info**

# Extend API with new functionality

> Create new resource to the projects
Go to **src/functions** folder and add a new file **projects.ts**

```typescript
// ...
export async function projects(
    req: HttpRequest,
    context: InvocationContext
): Promise<Response> {
    // ...
}
app.http("projects", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    route: "projects/{*id}",
    handler: projects,
});
// ...
```


> Extend the http rest client test file

```bash
########## /api/projects - working with projects ##########

### Get all projects
{{base_url}}/projects

### Get project by id
{{base_url}}/projects/1

### Get project by project or client name
{{base_url}}/projects/?projectName=supply

### Get project by consultant name
{{base_url}}/projects/?consultantName=dominique

### Add consultant to project
POST {{base_url}}/projects/assignConsultant
Content-Type: application/json

{
    "projectName": "contoso",
    "consultantName": "sanjay",
    "role": "architect",
    "forecast": 30
}
```

> Add **projects** to the application package by extending **trey-definition.json** OAS file with new API calls

> Add projects to the plugin definition file **trey-plugin.json**

```json
{
    "name": "getProjects",
    "description": "Returns detailed information about projects matching the specified project name and/or consultant name",
    "capabilities": {
        "response_semantics": {
            "data_path": "$.results",
            "properties": {
            "title": "$.name",
            "subtitle": "$.description"
            }
        }
    }
},
```

Notice that it includes some response_semantics which instruct Copilot in the important properties to mention when referring to a project in its responses. The POST request has a similar function:

```json
{
    "name": "postAssignConsultant",
    "description": "Assign (add) consultant to a project when name, role and project name is specified.",
    "capabilities": {
    "response_semantics": {
        "data_path": "$",
        "properties": {
        "title": "$.results.clientName",
        "subtitle": "$.results.status"
        }
    },
    "confirmation": {
        "type": "AdaptiveCard",
        "title": "Assign consultant to a project when name, role and project name is specified.",
        "body": "* **ProjectName**: {{function.parameters.projectName}}\n* **ConsultantName**: {{function.parameters.consultantName}}\n* **Role**: {{function.parameters.role}}\n* **Forecast**: {{function.parameters.forecast}}"
    }
    }
}
```


It includes an (adaptive card)[https://adaptivecards.io/] to be used in the confirmation card, which is shown to users to confirm an action prior to issuing a POST request.

Scrolling down, you can see the runtimes object which defines the type of plugin, the OAS definition file location, and a list of functions. The new functions have been added to the list.

```json
"runtimes": [
{
    "type": "OpenApi",
    "auth": {
    "type": "None"
    },
    "spec": {
    "url": "trey-definition.json"
    },
    "run_for_functions": [
    "getConsultants",
    "getUserInformation",
    "getProjects",
    "postBillhours",
    "postAssignConsultant"
    ]
}
],
```

Finally, it includes some conversation starters which are prompt suggestions shown to users; the new file has a conversation starter relating to projects.

```json
"capabilities": {
"localization": {},
"conversation_starters": [
    {
    "text": "What Trey projects am i assigned to?"
    },
    {
    "text": "Charge 5 hours to the Contoso project for Trey Research"
    },
    {
    "text": "Which Trey consultants are Azure certified?"
    },
    {
    "text": "Find a Trey consultant who is available now and has Python skills"
    },
    {
    "text": "Add Avery as a developer on the Contoso project for Trey"
    }
]
}
```
