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

During creation It will ask you to choose the package management tool(yarn, npm) and in the end you will have listed the commands to start using your new porject

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

$ nest g controller RANDOM

```

Sample:

```js
// @Controller() - will handle request for root route: your-domain.com/
// @Controller('prod') -> your-domain.com/prod/
@Controller()
export class AppController{
    // dependency injection: inject a service to your controller
    // who create the instance of this class has to pass this AppService -> for us NestJs will pass this service obbject
    // that is happening in because you put it in the app.module in the providers the service that you want to inject: ** providers: [AppService] **
    constructor(private readonly appService: AppService) {}

    // @Get() -> this is call for root route( 'your-domain.com/' )
    // @Get('users') -> your-domain.com/users
    // @Controller('prod') & @Get('users') -> your-domain.com/prod/users
    @Get()
    getHello():string {
        this.appService.getHello();
    }
}

```

> Route wildcards

Pattern based routes are supported as well. For instance, the asterisk is used as a wildcard, and will match any combination of characters.

```
@Get('ab*cd')
```

The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.

---

> ## Providers

> Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be injected as a dependency

![Providers](https://docs.nestjs.com/assets/Components_1.png)

> Proivder offers the logic for the controller, like reaching to database.

```
$ nest g service cats
```

```js
// Decorator for making sure making sure this service can be injected
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello world';
    }
}
```

---

> ## Modules

> A module is a class annotated with a **@Module()** decorator. The **@Module()** decorator provides metadata that **Nest** makes use of to organize the application structure.

```
$ nest g module RANDOM
```

![Modules](https://docs.nestjs.com/assets/Modules_1.png)

```js
// @Module is a decorator that apply to AppModule class
@Module({
    imports: [], // import other modules
    controllers: [AppController], // handle incoming request
    providers: [AppService], // provide certain functionalities
})
export class AppModule {}
```

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
