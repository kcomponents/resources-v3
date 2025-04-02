![Kruger Corp](https://img.shields.io/badge/Kruger_Corp_®-Copyright_2022-blue)

# KngBaseWeb

Base project for Angular 17 applications.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8

```
npm i -g @angular/cli@17.3.8
npm i -g typescript@5.4.2
```

## First steps
### 1. Important
```
Use Node v20.14.0 with npm v10.7.0
```

### 2. Install dependencies
Locate at the root folder project and install dependencies
```
npm install
```

Note: repository registry is config in the `.npmrc` file of this projects. 

### 3. Run development server
```
npm start
```
The npm start script runs a development server with a proxy configuration from `proxy.conf.json` file.

Once the compilation is finished, the displayed url will be shown in console.
[http://localhost:9004/](http://localhost:9004/)


# KRUGER INSTRUCTIONS

## Build

Run `npm run build` for a build in --prod mode and change base-href.

## Build with custom configutation or enviroment

Run `ng build --configuration=pre` for a build with pre enviroment

## EsLint rules

Run `npm run lint:ci` for a report lint rules.

Important: for Windows remove single quotes from the script
 ```
    "lint:ci": "eslint --format=checkstyle > checkstyle-result.xml src/app/**",
```
When check the EsLint rules in windows, do not forget to place the quotes again
## Generate war file

Run `npm run war` for create war file  before most be run  `npm run build`

## Build and generate war file

Run `npm run build:war` for a build in --prod mode and change base-href and generate war file

# Others instructions
## If use deprecated libraries
If use libraries that not optimized for Angular 13, add in the `tsconfig.json`
```
"angularCompilerOptions": {
    "enableIvy": false
  }
```
after "compilerOptions"

# Angular commands
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Important: to disable Single Run for test and see the results into navigator, chague the `karma.conf.js` file, uncomment `Chrome` line and comment `ChromeHeadless` line, finally change `singleRun` parameter to `true`
```
    //browsers: ['ChromeHeadless'],
    browsers: ['Chrome'],
    singleRun: false,
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](https://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
