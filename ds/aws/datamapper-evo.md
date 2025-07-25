# DataMapper Evolution: Command-Based Architecture

This document outlines the proposed architectural evolution of our internal `DataMapper` library to a **new** design. The **new implementation** will follow the *AWS SDK v3-style command-based* architecture to improve modularity, testability, scalability, and long-term maintainability.

The existing implementation is a method-centric, logic-heavy DataMapper class that handles schema resolution, marshalling/unmarshalling, and DynamoDB command orchestration directly inside its public methods.

I propose to refactor the existing system into a command-oriented framework where each operation (e.g., put, get, delete) is encapsulated as a self-contained Command object. This aligns with the design principles used in the AWS SDK v3, where all operations are driven by composable command objects passed to a lightweight client abstraction.

---

## Motivation

The migrated DataMapper introduces a command-based architecture that not only modernizes the client structure but also addresses limitations in how expressions were handled in the v2 SDK-based mapper.

The expression strings (e.g., condition/update expressions) were either manually constructed or injected into input objects directly, often requiring the developer to manage ExpressionAttributeNames and ExpressionAttributeValues themselves.

Migrated version will be improved and replaced with a type-safe, schema-aware expression builder system and a dedicated middleware (`expressionMiddleware`) that centralizes all expression compilation logic. This proposed approach aligns with SDK v3's middleware-first design and offers better modularity, validation, and testability.

### Problems in the previous design:

- **Tight Coupling**: Responsibilities like schema detection, marshalling, and hydration were centralized inside method bodies.
- **Low Extensibility**: Adding new behaviors required modifying core methods instead of composing commands.
- **Poor Testability**: Individual concerns (e.g., schema logic) were hard to test in isolation.
- **No Behavioral Reuse**: Operations like put/get were bound to high-level methods, not standalone command objects.

### Improvements with new design:

- **Separation of Concerns**: Commands handle behavior, while `DataMapper` orchestrates.
- **Customizable Strategies**: Schema, marshalling, and hydration are pluggable
- **Composable Execution**: Commands can be reused, tested, or extended independently
- **Alignment with AWS SDK v3**: Developers familiar with AWS SDK will feel at home.

---

## Current vs. Proposed Architecture

### `DataMapper` - Centralized, Fat Client

```
+-------------------+
|    DataMapper     |
+-------------------+
| put()             |
| get()             |
| delete()          |
| -> schema logic   |
| -> marshalling    |
| -> hydration      |
| -> send()         |
+-------------------+
```

### New proposal - Command-Based, Modular

```
+-------------------+
|    DataMapper     |
+-------------------+
| send(command)     |
| put() -> PutCommand|
+--------+----------+
         |
         v
+------------------------+
|     PutCommand<T>      |
+------------------------+
| schema validation      |
| marshalling logic      |
| AWS command wrapping   |
+------------------------+
```

### Summary of Changes

| Ported DataMapper from V2 SDK | New DataMapper Command-Based      |
| -------------------------- | ------------------------------------ |
| Monolithic method logic    | Isolated command logic               |
| Tight coupling of concerns | Clear separation of responsibilities |
| Difficult to extend/test   | Highly modular and testable          |

---

## Proposed Design Structure

The new design revolves around a unified structure where each `DataMapperCommand` encapsulates the operation-specific metadata (like input shape, supported expression types, and key nodes), while the `DataMapper` coordinates hydration, marshalling, and middleware execution globally. This promotes a clear separation of concerns, where hydration is treated as a mapper-level strategy, not a per-command responsibility.


### `DataMapper`

```ts
interface DataMapperOptions {
  schema: Schema;
  toDocument?: <T>(model: T) => Record<string, any>;
  fromDocument?: <T>(data: any) => T;
}

class DataMapper {
  constructor(
    private readonly client: DynamoDBClient,
    private readonly options: DataMapperOptions
  ) {}

  private defaultToDocument<T>(model: T): Record<string, any> {
    return typeof model === "object" ? { ...model } : { value: model };
  }

  private defaultFromDocument<T>(doc: any): T {
    return doc as T;
  }

  async put<T>(model: T) {
    const toDoc = this.options.toDocument ?? this.defaultToDocument;
    const document = toDoc(model);
    await this.send(new PutCommand(document));
  }

  async get<T>(key: KeySchema): Promise<T | undefined> {
    const result = await this.send(new GetCommand(key));
    const fromDoc = this.options.fromDocument ?? this.defaultFromDocument;
    return result.Item ? fromDoc(result.Item) : undefined;
  }

  async send<T>(command: DataMapperCommand<any, T>): Promise<T> {
    const stack = new MiddlewareStack();
    const handler = command.resolveMiddleware(stack, {
      client: this.client,
      schema: this.options.schema,
    });
    const { output } = await handler({ input: command.input } as any);
    return output;
  }
}
```

### Base `DataMapperCommand`

```ts
abstract class DataMapperCommand<Input extends object, Output extends object = Input> {
  abstract readonly input: Input;
  abstract readonly clientCommand: Command<Input, Output, any>;

  protected readonly inputKeyNodes: KeyNode[] = [];
  protected readonly outputKeyNodes: KeyNode[] = [];
  protected readonly supportsExpressions: boolean = false;
  protected readonly hydrator?: (data: any) => any;

  resolveMiddleware(
    stack: MiddlewareStack<Input, Output>,
    config: DataMapperResolvedConfig
  ): Handler<Input, Output> {
    const { schema } = config;

    if (this.supportsExpressions) {
      stack.add(expressionMiddleware(schema), { step: "initialize" });
    }

    if (this.inputKeyNodes.length > 0) {
      stack.add(marshallMiddleware(this.inputKeyNodes, schema), { step: "initialize" });
    }

    if (this.outputKeyNodes.length > 0) {
      stack.add(unmarshallMiddleware(this.outputKeyNodes, schema), { step: "deserialize" });
    }
    return stack.resolve(
      (args) => config.client.send(this.clientCommand),
      {
        clientName: "DataMapper",
        commandName: this.constructor.name,
      }
    );
  }
}
```

### `PutCommand`

```ts
class PutCommand<T> extends DataMapperCommand<PutItemInput, PutItemOutput> {
  readonly input: PutItemInput;
  readonly clientCommand: PutItemCommand;
  protected readonly inputKeyNodes = [{ key: "Item" }];
  protected readonly outputKeyNodes = [];
  protected readonly supportsExpressions = true;

  constructor(params: {
    model: T;
    schema: Schema;
    condition?: ConditionExpressionTree;
    returnValues?: "NONE" | "ALL_OLD";
  }) {
    super();

    const { model, schema, condition, returnValues } = params;
    const marshalledItem = marshallItem(model, schema);

    const input: PutItemInput = {
      TableName: schema.tableName,
      Item: marshalledItem,
    };

    if (condition) {
      (input as any).condition = condition;
    }

    if (returnValues) {
      input.ReturnValues = returnValues;
    }

    this.input = input;
    this.clientCommand = new PutItemCommand(this.input);
  }
}
```

**Usage**

```ts
await mapper.send(new PutCommand({
  model: user,
  schema: userSchema,
  condition: conditionExpression(user).attribute("id").notExists(),
  returnValues: "ALL_OLD"
}));
```

---

## Phased Integration Plan

### Phase 1: Internal Refactor

- Create base `DataMapperCommand`
- Implement `PutCommand`, `GetCommand`, `DeleteCommand` using the new structure
- Call commands internally within `DataMapper.put()` etc.

### Phase 2: Expand Coverage

- Migrate batch commands and transactional operations
- Add `DataMapper.send()` as a public method
- Add input/output typing improvements

### Phase 3: Deprecate Old Paths

- Mark direct method logic as deprecated
- Finalize public command interface for advanced usage

---

## Expression Architecture and Middleware Design

The expression system is fully embedded in the command lifecycle — not treated as a separate concern. Expressions are declared as part of the command input and compiled via `expressionMiddleware` based on feature flags (e.g. `supportsExpressions = true`).

### Expression API

```ts
conditionExpression(user).attribute("id").notExists()
updateExpression(user).set("name", "Alice")
```

### Internals

- Expression builders create ASTs
- Commands pass expression trees in `input`
- `expressionMiddleware()` detects and compiles them
- Compiled values are injected into command input for final serialization

This unified structure ensures that expression logic, schema validation, marshalling, and hydration are handled consistently through shared middleware. Hydration is delegated to a mapper-level strategy (`fromDocument`) rather than per-command injection, allowing commands to remain stateless and reusable.


---

## Drawbacks and Mitigations

| Drawback                        | Mitigation                                      |
| ------------------------------- | ----------------------------------------------- |
| Initial refactor overhead       | Do it incrementally with v1 and v2 side-by-side |
| Slight increase in boilerplate  | Extract shared logic in base command class      |
| Learning curve for contributors | Document architecture and provide scaffolds     |

---

## Conclusion

This migration will elevate the DataMapper to a modern, scalable architecture consistent with the AWS SDK v3 and cleanly separates behavior from orchestration. It enables testability, custom extensibility, and aligns with open SDK design patterns.

By introducing `DataMapperCommand` as the behavioral unit and demoting `DataMapper` to an execution host, we unlock new use cases, simplify maintenance, and empower flexible extension without sacrificing developer experience.

Expression building, middleware registration, marshalling, and hydration are now part of a single, unified command structure.
