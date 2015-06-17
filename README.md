# angular-test — An angular project to test interview candidates

This project is an application skeleton generated from angular-seed project https://github.com/angular/angular-seed

It also has a static json file that will start a json server using https://github.com/typicode/json-server


## Getting Started

Clone the project, install all the required dependencies and start the json-server 

````bash
npm install
json-server connector.json --routes routes.json
````

### Prerequisites

npm install

sudo npm install -g json-server

json-server

### Test 1
A sample connector.json file contains the data for connector and fields object. These 2 objects are used to populate data in UI Components. Use this data to make the connector.html file functional

The html has 2 sections.

The table in the left shows a list of connectors.

The table in the right shows the configurations for the selected connector.

Selecting one connector from the list in the left will show the list of configurations for the selected connector and a select box with the list of fields. 

The user of this page will take the following actions :

1. Select a connector from the left
2. Select a field for each line in configurations on the right
3. Click on Save to associate the selected field to a configuration

The goal is to make this page functional so when the save button is clicked the mappingfield attribute is populated in the  connector.json file. For ex : If connector with id 1 is selected and the field with id 112 is selected for configuration with id 1 then the resulting json in connector.json should be :

````json
        {
          "createdAt": 1434087234985,
          "description": "Id",
          "id": 1,
          "mappingField": "112",
          "name": "id",
          "type": "Mandatory"
        }
````