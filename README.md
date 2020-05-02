# frontend-patient-pwa

# API Configurations
You can configure this PWA to use an arbitrary Testbefund API. 

## Docker
When running the docker image, set the TESTBEFUND_API_URL environment variable. During startup, this env is written
into the config.js, which is delivered with the index.html. 

## Local
Copy the sample-config.js into config.js, replace the url as needed.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
