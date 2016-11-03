# is-my-world-spinning

> A Basic Terminal Utility App to check if my favorite services
> and other things are up and running


## installation:

You need [npm][npm] (bundled with [node.js][nodejs]):

```bash
$ npm install is-my-world-spinning --global
```


## usage:

```bash
$ is-my-world-spinning

  This is how the world looks like right now!

        ✓ bitbucket
        ✓ github
        ✓ npm
        ✓ twitter

```

Exits with code:

* **0**: everything is okay
* **1**: one of the status-checks reports service is **bad/down**
* **2**: one of the status-checks failed
* **3**: unexpected error

See **help information**:

```bash
$ is-my-world-spinning --help
```


## API:

```js
const checks = require("is-my-world-spinning");
```


#### checks.main([options, ]callback)

Run the status-checks.

Parameters:

* **options** (Optional, Object):
    * **ui** (Optional, Boolean, Default:`false`): log output to terminal
    * **filter** (Optional, Array, Default:`null`): names of checks to do
* **callback** (Required, Function, signature:`callback(error, statuses, data)`):
    * **error**: truthy if an unexpected error occurs
    * **statuses** (Object): mapping from service names to their statuses
    * **data** (Object): useful data for consumers
    * **data.constants** (Object): constants used
    * **data.constants.status** (Object): mapping from statuses to their values.
    * **data.constants.status.waiting** (Number): check in `waiting` state
    * **data.constants.status.good** (Number): check in `good` state
    * **data.constants.status.moderate** (Number): check in `moderate` state
    * **data.constants.status.bad** (Number): check in `bad` state
    * **data.constants.status.errored** (Number): check in `errored` state



### license:

**The MIT License (MIT)**

Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>


[npm]:https://npmjs.com
[nodejs]:https://nodejs.org
