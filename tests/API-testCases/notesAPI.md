## Common Assertions for API

### GET /notes

- **Status Code**: 200
- **Response Body**: 
```json
{
  "notes": [
    {
      "id": 1,
      "title": "Note 1",
      "content": "Content 1"
    },
    {
      "id": 2,
      "title": "Note 2",
      "content": "Content 2"
    }
  ]
}
```

The major difference between response and responseBody is that response is the entire response object and responseBody is the body of the response object.

Examples of assertions:
- `expect(response.status).toBe(200);` - checks if the status code is 200
- `expect(response.ok).toBeTruthy();` - checks if the response is ok
- `expect(response.length).toBeGreaterThan(0);` - checks if the response length is greater than 0
- `expect(responseBody.firstname).toBe("Josh");` - checks if the response body has a key firstname with value Josh
- `expect(responseBody.lastname).toBe("Long");` - checks if the response body has a key lastname with value Long
- `expect(newPost).toMatchObject({title: "Note 1", content: "Content 1"});` - checks if the newPost object has title as Note 1 and content as Content 1
- `expect(newPost).toHaveProperty("id");` - checks if the newPost object has a key id
- `expect(response.timing().duration).toBeLessThan(1000);` - checks if the response time is less than 1000ms
- `expect(responseBody.headers).toHaveProperty("content-type", "application/json");` - checks if the response body has a key headers with content-type as application/json
- `expect(responseBody.headers).toHaveProperty("content-length", "1024");` - checks if the response body has a key headers with content-length as 1024
- `expect(responsebody.id).toBeDefined();` - checks if the response body has a key id

These assertions are used to validate the response of the API. The response object contains the status code, headers, and body of the response. The responseBody object contains only the body of the response. The assertions are used to check if the response is as expected and to validate the data returned by the API.

Dealing with values in the JSON body is simple, but whenthe JSON body is an array, it becomes a bit tricky. In such cases, you can use the `expect.arrayContaining` method to check if the response body contains an array of objects. 

If the key is a nested object, you can use the `expect.objectContaining` method to check if the response body contains an object with the specified key.


expect (responseBody.address).toEqual(expect.arrayContaining([responseBody.zipcode]));

The complexity of assertions will be determined by the complexity of the JSON Schema, and the number of keys in the JSON body. The more complex the JSON Schema, the more complex the assertions will be.

### JSON schema validation

JSON schema validation is a way to validate the structure of the JSON response. It is a way to define the structure of the JSON response and validate it against the schema. This is useful when you want to validate the structure of the JSON response and ensure that it conforms to a specific schema.

In playwright, you can use the `expect(responseBody).toMatchSchema(schema)` method to validate the JSON response against a schema. The schema is a JSON object that defines the structure of the JSON response. The `toMatchSchema` method will validate the JSON response against the schema and return true if the response matches the schema, and false if it does not.

Example: 
```json
{
  "type": "object",
  "properties": {
    "id": {"type": "number"},
    "title": {"type": "string"},
    "content": {"type": "string"}
  },
  "required": ["id", "title", "content"]
}
```

In this example, the schema defines an object with three properties: id, title, and content. The id property is of type number, and the title and content properties are of type string. The schema also specifies that the id, title, and content properties are required.

The `toMatchSchema` method will validate the JSON response against this schema and return true if the response matches the schema, and false if it does not.

JSON schema validation is a powerful way to validate the structure of the JSON response and ensure that it conforms to a specific schema. It is useful when you want to ensure that the JSON response has a specific structure and contains specific properties.

Example function for JSON schema validation:
```javascript

function validateSchema(responseBody, schema) {
  try {
    expect(responseBody).toMatchSchema(schema);
    console.log("Schema validation passed");
  } catch (error) {
    console.error("Schema validation failed", error);
  }
}
```

This function takes the responseBody and schema as input and validates the responseBody against the schema. If the validation passes, it logs "Schema validation passed", and if it fails, it logs "Schema validation failed" along with the error message.

JSON schema validation is a powerful way to validate the structure of the JSON response and ensure that it conforms to a specific schema. It is useful when you want to ensure that the JSON response has a specific structure and contains specific properties.


