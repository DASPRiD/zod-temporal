# Temporal integration for Zod validation library

[![Release](https://github.com/dasprid/zod-temporal/actions/workflows/release.yml/badge.svg)](https://github.com/dasprid/zod-temporal/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/DASPRiD/zod-temporal/graph/badge.svg?token=kIFH8Cj9tM)](https://codecov.io/gh/DASPRiD/zod-temporal)

This library adds additional types for [Zod](https://github.com/colinhacks/zod/) to parse and validate dates, times and durations as
[Temporal](https://tc39.es/proposal-temporal/) types. This library has support for both `zod/v4` and `zod/v4/mini`.

## Installation

Install via your favorite package manager:

```bash
npm install zod-temporal
# or
pnpm add zod-temporal
# or
yarn add zod-temporal
```
  
## Quick Start

Import the schema types from this package. You can either import individual types or import all types via a convenience
method:

```ts
import { zt } from 'zod-temporal';
```

For `zod/v4/mini`, import from the mini sub-path:

```ts
import { zt } from 'zod-temporal/mini';
```

This library supplies the following types:

- `zt.duration()`
- `zt.plainDate()`
- `zt.plainDateTime()`
- `zt.plainTime()`
- `zt.offsetDateTime()`
- `zt.zonedDateTime()`
 
In contrast to zod-joda, `zt.zonedDateTime()` represents date times with timezone information, while
`zt.offsetDateTime()` also parses to a `Temporal.ZonedDateTime` but cast to UTC.

## Encoding

The temporal schemas are implemented as [codecs](https://zod.dev/codecs). This allows you to not only parse temporal
values from their ISO string representation but also to encode them back:

```ts
const schema = zt.plainTime();
const value = schema.encode(Temporal.PlainTime.from('12:34:56.789'));
```
