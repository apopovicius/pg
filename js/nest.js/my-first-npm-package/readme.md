# My first package

The goal of this projects are to implement a package that will export a middleware where I modify the req object and used this shared library in a classic nestjs application.

## Generating the package project files & implementation

```bash
$nest new my-mw-pkg
cd my-mw-pkg
Remove-Item .\src\*.ts
mkdir .\src\middleware
touch .\src\middleware\a.middleware.ts
touch .\src\middleware\b.middleware.ts
touch .\src\middleware\c.middleware.ts
touch .\src\index.ts
```

We use index.ts as a central place where we expose our functionality from the package

```typescript
/*index.ts*/
export * from './middleware/a.middleware';
export * from './middleware/b.middleware';
export * from './middleware/c.middleware';
```

Here is a sample of how the middleware files will look like

```typescript
// middleware/a.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MiddlewareA implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log('Middleware A');
        next();
    }
}
```

After this the project structure will look like this:

<pre>
|-- src/
|   |-- middleware/
|   |   |-- a.middleware.ts
|   |   |-- b.middleware.ts
|   |   |-- c.middleware.ts
|   |-- index.ts
|-- package.json
|-- tsconfig.build.json
|-- tsconfig.json
</pre>

## Export the package to npm

1. Update the **package.json** with necessary information so that you expose the functionality. In our case I've added in the **main** section the **index.ts** where we export all middlewares. Also mentioned the **types**

The **peerDependencies** is to indicate that your package relies on certain functionality provided by another package, but it doesn't want to include it directly as a dependency. Instead, it relies on the consumer to install the correct version of the peer dependency.

```json
{
    "name": "my-mw-pkg",
    "version": "1.0.0",
    "description": "Shared NestJS Middleware Package",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
        "build": "tsc -p tsconfig.build.json"
    },
    "devDependencies": {
        "@nestjs/cli": "^8.0.0",
        "@nestjs/common": "^8.0.0",
        "typescript": "^4.4.3"
    },
    "peerDependencies": {
        "@nestjs/common": "^8.0.0"
    }
}
```

2. Create/Edit the tsconfig.build.json file for compilation settings:

```json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
        "declaration": true,
        "declarationMap": true
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules"]
}
```

3. Build the package:

```bash
npm install
npm run build
```

4. Publish the package to npm or git or whatever:

```bash
npm login
npm publish --access public
```

## Make use of the freshly published shared library(package) in your nest application

```bash
$nest new test-app-using-my-pkg
cd test-app-using-my-pkg
npm install my-mw-pkg
```

Make use of the middleware by importing in your app.module.ts

```typescript
// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MiddlewareA, MiddlewareB, MiddlewareC } from 'nest-middleware-package';

@Module({})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MiddlewareA, MiddlewareC).forRoutes('*');
    }
}
```
