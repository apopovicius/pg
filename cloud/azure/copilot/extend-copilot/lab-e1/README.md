# LabE1 - Explore cities accorss the globe

- What is a declarative agent?
- Create declrative agent using Teams Toolkit template
- Customize the agent to create geo locator game using instructions
- How to run and test your app

## What is a declarative agent?

Declarative agents leverage the same scalable infrastructure and platform of Microsoft 365 Copilot, tailored specifically to meet focus on a special area of your needs. 

They function as subject matters in a specific area or bussiness need, allowing to use the same interface as a standard Microsoft 365 Copilot chat while ensuring they focus exclusively on the specific task at hand.

### Anatomy of a declarative agent

|Element|Description|Name of file|
|---|---|---|
|App manifest| Describes app configuration, capabilities, required resources, and import attributes|manifest.json|
|App icons|Requires a color(192x192) and outline(32x32) icon for declarative agent| icon.png, color.png|
|Declarative agent manifest|Describes agent configuration, instructions, required fields, capabilities, coversation starters and actions| declarativeAgent.json|

> You can add reference data from Sharepoint, OneDrive, Websearch etc, and add extension capabilities to a declarative agent like plugins and conectors

### Capabilities of a declarative agents

You can enhance the agent's focus on context and data by not only adding instructions but also specifying the knowledge base it should access. They are called *capabilities* and there are three types of capabilities supported: 

1. **Microsoft Graph Connectors** - pass connections of Graph connectors into the agent, allowing the agent to access and utilize the connector's knowledge

2. **OneDrive and SharePoint** - provide URLs of files and sites to agents, for it to gain access to those contents.

3. **Web search** - enables or disables web content as part of the agents knowledge base

> ! at the moment you cannot pass specific websites or domains to agents as web search capabilities, and this acts only as a toogle on and off to use the web.

> Not specifying the connections, the entire corpus of Graph Connectors content available to the logged in user will be sued by the agent

> URLs should be full path to Sharepoint items( site, document library, folders, or files). You can use the "Copy direct link" option in Sharepoint to get the full path or files and folders. To achieve this, right-click on the file or folder and select Details. Navigate to Path and click on the copy icon. Not specifying the URLs the entire corpus of OneDrive and SharePoint content available to the loggend in user will be used by the agent.

## Teams toolkit template

For this lab we will use the **Teams Toolkit** extension and the **create new app** flows/project boiler plate.

> Step1: Create new app > Copilot Agent > Declarative agent > No Plugin > "Select workspace folder" > "Choose app name" > Done

> Step2: Setup accounts in Teams Toolkit 

> 1. Sign in to Microsoft 365

> Check if Custom App Upload Enabled and Copilot Access Enabled after login

> 2. Sign in to Azure

### Generated app project file structure

|Folder/File|Contents|
|---|---|
|.vscode|VSCode files for debugging|
|appPackage|Templates for the Teams application manifest, the GPT manifest, and the API specification|
|env|Environment files with a default *.env* *.dev* file|
|appPackage/color.png|Application logo image|
|appPackage/outline.png|Application logo outline image|
|appPackage/declarativeAgent.json|Defines settings and configs of the declarative agent|
|appPackage/instruction.txt|Defines the behaviour of declarative agent|
|appPackage/manifest.json|Teams application manifest that defines metadata for your declarative agent|
|teamsapp.yml|Main Teams Toolkit project file. The project file defines two primary things: proprieties and configuration stage definitions|


> **appPackage/instruction.txt** contains the core directives needed for the agent. It is plain text file and you can write natural language instructions in it.

> **appPackage/declarativeAgent.json** contains the schema to be followed to extend Microsoft 365 Copilot with the new declarative agent. Here are the proprieties from this file:

- The **schema** is the schema reference
- The **version** is the schema version
- The **name** key represents the name of the declarative agent
- The **description** provides a description.
- The **instructions** the path to the **intructions.txt** file which holds directives which will determine the operational behaviour. You can also put your instructions as plain text as a value here.

You can enhance user engagement with the declarative agent by adding conversion starts to it. Some of the benefits are:
- engagement: they help initiate interaction, making users feel more comfortable and encouranging participation
- context setting: starters set the tone and topic of the conversation, guiding users on how to proceed.
- efficiency: by leading with a clear focus, starters reduce ambiguity allowing the conversation to progress smoothly
- user retention: well-designed starters keep users interested, encouragin repeat interactions with the AI.
Each **conversation_starters** can be added in the **declarativeAgent.json** file:
```json
"conversation_starters": [
    {
        "title":"Getting Started",
        "text":"Lorem ipsum text here!"
    },
    {
        "title":"Ready for a challenage",
        "text":"Place your text here"
    }
]
```

> **appPackage/manifest.json** contains crucial metadatam including package name, the developers name, references to the copilot agents utilesd by the application. 

```json
"copilotAgents": {
    "declarativeAgents": [
        "id": "declarativeAgent",
        "file": "declarativeAgent.json"
    ]
}
```

In this manifest file you can update the logo file and outline.

## How to run/test app

There is a **Lifecycle** section in the Teams ToolKit extension. Click on provision to upload the file on azure artifactory and you will be able to test it after. At this step Teams toolkit will package up all the files inside the appPackage folder as a zip file and install the declarative agent to your own app catalog. Go to Teams in browser and log in into your dev tenant. If you have Microsoft 365 Copilot, the new app will be automatically pinned above your chats. Just open Teams, select *chats* and you will see Copilot. 

To launch app from **Teams ToolKit** by clicking **Preview Your Teams App** from the **Development** section.

### Adding files for reference

Declarative agents can have three main capabilities, one of which is referencing SharePoint and OneDrive. 

1. For this you will need to upload on your Sharepoint or OneDrive the files(pdf or other extension).
2. copy full URL of the uploaded file
3. go to **.env.dev** and add the token ENV variable with the full copied URL 
```env
SP_SITE_URL=https://username.sharepoint.com/sites/XYZ
```
4. go to **appPackage/declarativeAgent.json** and map the url token into the agent
```json
"capabilities": [
    {
        "name":"OneDriveAndSharePoint",
        "items_by_url": [
            {
                "url":"${{SP_SITE_URL}}"
            },
            {
                "url":"${{SP_SITE_URL_2}}"
            }
        ]
    }
]
```
> There are no limit to how many URLs you can add!
5. update **appPackage/manifest.json** manifest version from "1.0.0" to "1.0.1" so the changes are reflected when you install.