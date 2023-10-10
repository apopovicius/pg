> # Nest.js
>
> `Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).` - definition from official page

## Installing globally nestjs cli

```
$ npm i -g @nest/cli
```

---

## Create new nest project

```
$ nest new project-name
```

During creation It will ask you to choose the package management tool(yarn, npm) and in the end you will have listed the commands to start using your new project

```
$ cd project-name
$ npm run start
```

---

## Running application

```
$ npm run start:dev
```

---

## Nest Project structure

Open the project with your fav IDE

-   **node_modules** -> here are our project dependencies that are managed by **package.json** file

-   **src** -> your source code files

-   **test** -> test files(e2e testing)

-   **tsconfig.json** -> typescript configuration

> ### **src** folder

-   **.spec** -> The unit tests for the controller

-   **main.ts** -> The entry file of the application which uses the core function NestFactory to create a Nest application instance

-   **app.controller** -> here is the income-ing request handler

-   **app.module** -> The root module of the application.

-   **app.service** -> handle logic for controller

---

> ## Controllers

> Handling incoming requests and sending back responses
>
> ref: https://docs.nestjs.com/controllers

![Controllers](https://docs.nestjs.com/assets/Controllers_1.png)

To create a controller using the CLI, simply execute the

```
$ nest generate controller XYZ
// or shorthand
$ nest g co XYZ
// or to generate to specific folder
$ nest g co module\controller-name
```

It generates a new folder with controller and test in it.

Also new controller was added in app.modules controller list.

**@Controller** decorator = your main route.

**@Get, @Post, @Put** inside your class decorators for your handling methods of various requests

```js
@Controller('coffees')
export class CoffeesController {
    @Get('nested')
    findAll() {
        return 'this action return all coffees';
    }
}
```

**@Param** - use Route parameters

```js
//   @Get(':id')
//   findOne(@Param() params) {
//     return `this actions returns #${params.id} coffee`;
//   }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this actions returns #${id} coffee`;
  }
```

**@Body** - Handling Request Body Payload

```js
  //   @Post()
  //   create(@Body() body) {
  //     return body;
  //   }
  @Post()
  create(@Body('name') name: string) {
    return name;
  }
```

**@HttpCode** - customize response status code

```js
  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body('name') name: string) {
    return name;
  }
```

**@Res** - accessing Response object

```js
  @Get()
  findAll(@Res() response) {
    response.status(200).send('this action return all coffees');
  }
```

**@Patch** - updating info

```js
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `this action updates #${id} coffees with: ${body.name}`;
  }
```

**@Query** - pagination

> http://localhost:3000/coffees?limit=20&offset=10
>
> This action returns all coffees. Limit 20, offset: 10

```js
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;
  }
```

> **Route wildcards**

Pattern based routes are supported as well. For instance, the asterisk is used as a wildcard, and will match any combination of characters.

```
@Get('ab*cd')
```

The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.

---

> ## Providers/Services

> Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be injected as a dependency

![Providers](https://docs.nestjs.com/assets/Components_1.png)

> Proivder offers the logic for the controller, like reaching to database.

```
$ nest generate service XYZ
// or shorthand
$ nest g s XYZ
```

**@Injectable** - that marks a provider

```js
@Injectable()
export class CoffeesService {}
```

### How to inject a provider/service

```js
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  // TS shorthand help us declare and initialize service in place

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
```

---

> ## Modules

> A module is a class annotated with a **@Module()** decorator. The **@Module()** decorator provides metadata that **Nest** makes use of to organize the application structure.

```
$ nest generate module XYZ
//or shorthand
$ nest g m XYZ
```

![Modules](https://docs.nestjs.com/assets/Modules_1.png)

```js
@Module({
    controllers: [CoffeesController],
    providers: [CoffeesService],
})
export class CoffeesModule {}
```

> controllers - API routes for this module to use
>
> exports - list all providers from this module that can be imported in other modules
>
> imports - list of imported modules containing providers necessary in this module
>
> providers - services needed to be instantiated that can be shared at least across this module

In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.

![Sharded Modules](https://docs.nestjs.com/assets/Shared_Module_1.png)

Every module is automatically a shared module. Once created it can be reused by any module. Let's imagine that we want to share an instance of the RandomService between several other modules. In order to do that:

-   we first need to export the RandomService provider by adding it to the module's **exports** array:

```
@Module({
  controllers: [RandomController],
  providers: [RandomService],
  exports: [RandomService]
})
```

-   Now any module that imports the RandomModule has access to the RandomService and will share the same instance with all other modules that import it as well.

---

> ## DTO - Data Transfer Objects

We can define interfaces for input/output in our system.
e.g. Having a POST request, with DTOs we can define shape or interface for what we're expecting to receive for our body

```js
  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }
```

> nest g class coffees/dto/create-coffee.dto --no-spec --flat
>
> _no-spec -> avoid generate a test file_ <br/> > _flat -> avoid generating extra folder_

```js
  //--dto file
  export class CreateCoffeeDto {
    readonly name: string;
    readonly brand: string;
    readonly flavors: string[];
  }
  //-- in controller
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }
```

> ## Validate Input with DTOs

**ValidationPipe** - provides a convenient way of enforcing validation rules for all incoming client payloads.

> app.useGlobalPipes(new ValidationPipe());

```js
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
```

Additionally it will required installation of 2 packages:

> npm i class-validator class-transformer

Addition validation rules to the dto:

```js
import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
```

For reusability of parts from dtos

> npm i @nestjs/mapped-types

```js
export class UpdateCoffeeDto {
  readonly name?: string;
  readonly brand?: string;
  readonly flavors?: string[];
}
```

To remove duplication of code use `PartialType`

```js
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
```

> PartialType will return a CreateCoffeeDto with all fields OPTIONAL<br>
> PartialType not only marks all fields optional also inherits all the validations rules and add @IsOptional validation rule on the fly

> ## Handling malicious request data with ValidationPipe

It can filter out proprieties that should NOT be received by a method handler via "whitelisting"

```js
app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // 👈
    })
);
```

e.g. avoid user passing invalid proprieties to our CoffeeController POST request when creating new coffees
Additional proprieties passed in body payload will be automatically removed

```js
POST coffees
body: {
  "name": "XY",
  "brand": "TT",
  "flavors": ["cara"],
  "isEnabled":true
}
```

In addition ValidationPipe also give an option to STOP a request from being processed if any non-white listed proprieties are present

> forbidNonWhitelisted: true

```js
/* Throw errors when whitelisted properties are found */
app.useGlobalPipes(
    new ValidationPipe({
        forbidNonWhitelisted: true, // 👈
        whitelist: true,
    })
);
```

> ## Auto-transform payloads to DTO instances using ValidationPipe

Usually payloads come over the network as plain JavaScript objects.

```js
@Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto); // 👈 false
    this.coffeesService.create(createCoffeeDto);
    return createCoffeeDto;
  }
```

> transform: true,

```js
app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // 👈
    })
);
```

This auto transformation performs primitive Type conversions for things such booleans and numbers.
eg

```js
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }
```

> id comes over the network as a String. By changing the type of id to number ValidationPipe will try to automatically convert it to number

> ! this feature might impact performance
