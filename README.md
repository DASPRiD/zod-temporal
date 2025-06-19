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

Import the schema types from this package. You can either import individual types or import all types via convenience
method:

```typescript
import {zt} from 'zod-temporal';
```

For `zod/v4/mini`, import from the mini sub-path:

```typescript
import {zt} from 'zod-temporal/mini';
```

This library supplies the following types:

- `zj.duration()`
- `zj.plainDate()`
- `zj.plainDateTime()`
- `zj.plainTime()`
- `zj.offsetDateTime()`
- `zj.zonedDateTime()`
 
In contrast to zod-joda, `zj.zonedDateTime()` represents date times with timezone information, while
`zj.offsetDateTime()` also parses to a `Temporal.ZonedDateTime` but cast to UTC.
