# Shared config module

> Dependencies **@nestjs/config**

## Structure

<pre>
/libs/
  config/
    src/
      loaders/              
        app.ts              # process.env.NODE_ENV, PORT, etc.
        auth.ts             # AUTH_SECRET, AUTH_EXPIRES_IN, etc.
        database.ts         # DB_HOST, DB_PORT, etc.
      settings/               
        constants.ts        # version, limits, app name, etc.
        features.ts         # feature toggles or flags
      environments/         # actual .env files
        .env.development
        .env.staging
        .env.production
      config.module.ts
      index.ts
</pre>

| Folder            | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| **loaders/**      | Config loader functions (load: [appConfig, ...]) |
| **settings/**     | Hardcoded settings, feature flags, constants     |
| **environments/** | Centralized .env files, loaded by NODE_ENV       |

## Validation

> .env.validation schema contains all MANDATORY env variables so that your application can start

## Q&A

> What .forRoot() does:

- Loads .env files and config loaders (load: [...])
- Applies validation
- Marks the ConfigService as a global provider, available everywhere

> What .forFeature() does:

- Used when you don’t use isGlobal: true, and want to import config slices into specific modules.

Since you're already doing this globally, like so then all your services — including your SharedConfigService — already have access to the full ConfigService, without any need to call .forFeature().

> When would you use .forFeature()?
> Only in cases like:

- You want to lazy-load a specific config loader in a module (load: [someLoader])

- You don't use isGlobal: true and need to share ConfigService in isolated modules

- You want to make config access modular by domain (e.g., only load "paymentsConfig" in a PaymentsModule)

> But you're already centralizing everything in @shared-config — so .forFeature() is not necessary and would just be extra boilerplate.
