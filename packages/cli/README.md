budibase-version-manager
========================

Manage application versions inside Budibase via CLI.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/budibase-version-manager.svg)](https://npmjs.org/package/budibase-version-manager)
[![Downloads/week](https://img.shields.io/npm/dw/budibase-version-manager.svg)](https://npmjs.org/package/budibase-version-manager)
[![License](https://img.shields.io/npm/l/budibase-version-manager.svg)](https://github.com/fabiankaestner/budibase-version-manager/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @budibase-version-manager/cli
$ bbvm COMMAND
running command...
$ bbvm (-v|--version|version)
@budibase-version-manager/cli/0.1.0 win32-x64 node-v14.17.3
$ bbvm --help [COMMAND]
USAGE
  $ bbvm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bbvm application`](#bbvm-application)
* [`bbvm application:create [NAME]`](#bbvm-applicationcreate-name)
* [`bbvm application:delete [ID]`](#bbvm-applicationdelete-id)
* [`bbvm application:export [ID]`](#bbvm-applicationexport-id)
* [`bbvm help [COMMAND]`](#bbvm-help-command)
* [`bbvm login`](#bbvm-login)
* [`bbvm logout`](#bbvm-logout)
* [`bbvm modify:datasource [NAME]`](#bbvm-modifydatasource-name)
* [`bbvm status`](#bbvm-status)

## `bbvm application`

Manage Budibase applications.

```
USAGE
  $ bbvm application

OPTIONS
  -H, --host=host  the host:port of the Budibase backend.
  -h, --help       show CLI help

ALIASES
  $ bbvm application:list
  $ bbvm applications:list
  $ bbvm applications
```

_See code: [src/commands/application/index.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/application/index.ts)_

## `bbvm application:create [NAME]`

Manage Budibase applications.

```
USAGE
  $ bbvm application:create [NAME]

OPTIONS
  -H, --host=host          the host:port of the Budibase backend.
  -h, --help               show CLI help
  -s, --template-stdin     read the template string from stdin.
  -t, --template=template  use an application template file.

ALIASES
  $ bbvm applications:create
```

_See code: [src/commands/application/create.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/application/create.ts)_

## `bbvm application:delete [ID]`

Manage Budibase applications.

```
USAGE
  $ bbvm application:delete [ID]

OPTIONS
  -H, --host=host  the host:port of the Budibase backend.
  -h, --help       show CLI help

ALIASES
  $ bbvm applications:delete
```

_See code: [src/commands/application/delete.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/application/delete.ts)_

## `bbvm application:export [ID]`

Manage Budibase applications.

```
USAGE
  $ bbvm application:export [ID]

OPTIONS
  -H, --host=host  the host:port of the Budibase backend.
  -f, --file=file  save the application export to file.
  -h, --help       show CLI help
  -p, --pretty     pretty-print the output JSON

ALIASES
  $ bbvm applications:export
```

_See code: [src/commands/application/export.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/application/export.ts)_

## `bbvm help [COMMAND]`

display help for bbvm

```
USAGE
  $ bbvm help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `bbvm login`

Login to a Budibase service.

```
USAGE
  $ bbvm login

OPTIONS
  -H, --host=host  (required) the host:port of the Budibase backend.
  -h, --help       show CLI help
  -i, --insecure
  -p, --pass=pass  (required) the password to authenticate with.
  -u, --user=user  (required) the user/email to authenticate with.
```

_See code: [src/commands/login.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/login.ts)_

## `bbvm logout`

Logout from the current Budibase service.

```
USAGE
  $ bbvm logout

OPTIONS
  -H, --host=host  the host:port of the Budibase backend.
  -h, --help       show CLI help
```

_See code: [src/commands/logout.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/logout.ts)_

## `bbvm modify:datasource [NAME]`

Update the datasource details of Budibase JSON export.

```
USAGE
  $ bbvm modify:datasource [NAME]

OPTIONS
  -H, --host=host            the host:port of the Budibase backend.
  -f, --file=file            file to save output to.
  -h, --help                 show CLI help
  -i, --input=input          load input JSON from file.
  -p, --pretty               pretty-print the output JSON. Please note that prettyprinted JSON cannot be imported.
  --config:db=config:db      new datasource database.
  --config:host=config:host  new datasource host.
  --config:pass=config:pass  new datasource password.
  --config:port=config:port  new datasource port.
  --config:ssl               new datasource connection SSL status.
  --config:user=config:user  new datasource user.
```

_See code: [src/commands/modify/datasource.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/modify/datasource.ts)_

## `bbvm status`

describe the command here

```
USAGE
  $ bbvm status

OPTIONS
  -H, --host=host  the host:port of the Budibase backend.
  -h, --help       show CLI help
```

_See code: [src/commands/status.ts](https://github.com/fabiankaestner/budibase-version-manager/blob/v0.1.0/src/commands/status.ts)_
<!-- commandsstop -->
