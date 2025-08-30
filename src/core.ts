export type CoreParams = {
    error?: string;
};

// biome-ignore lint/suspicious/noExplicitAny: required to match any constructor
export type Constructor<T> = abstract new (...args: any[]) => T;

export type TransformConfig<T> = {
    parse: (input: string) => T;
    encode: (input: T) => string;
    instanceType: Constructor<T>;
    invalidMessage: string;
    schemaFormat: string;
    example: string;
};

export const durationConfig: TransformConfig<Temporal.Duration> = {
    parse: (input) => Temporal.Duration.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.Duration,
    invalidMessage: "Invalid duration",
    schemaFormat: "duration",
    example: "PT1H",
};

export const plainDateConfig: TransformConfig<Temporal.PlainDate> = {
    parse: (input) => Temporal.PlainDate.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.PlainDate,
    invalidMessage: "Invalid plain date",
    schemaFormat: "date",
    example: "2020-01-01",
};

export const plainDateTimeConfig: TransformConfig<Temporal.PlainDateTime> = {
    parse: (input) => Temporal.PlainDateTime.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.PlainDateTime,
    invalidMessage: "Invalid plain date time",
    schemaFormat: "plain-date-time",
    example: "2020-01-01T14:00:00",
};

export const plainTimeConfig: TransformConfig<Temporal.PlainTime> = {
    parse: (input) => Temporal.PlainTime.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.PlainTime,
    invalidMessage: "Invalid plain time",
    schemaFormat: "time",
    example: "14:00:00",
};

export const offsetDateTimeConfig: TransformConfig<Temporal.ZonedDateTime> = {
    parse: (input) => Temporal.Instant.from(input).toZonedDateTimeISO("UTC"),
    encode: (input) => input.toInstant().toString(),
    instanceType: Temporal.ZonedDateTime,
    invalidMessage: "Invalid offset date time",
    schemaFormat: "date-time",
    example: "2020-01-01T14:00:00Z",
};

export const zonedDateTimeConfig: TransformConfig<Temporal.ZonedDateTime> = {
    parse: (input) => Temporal.ZonedDateTime.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.ZonedDateTime,
    invalidMessage: "Invalid zoned date time",
    schemaFormat: "zoned-date-time",
    example: "2020-01-01T14:00:00+01:00[Europe/Berlin]",
};

export const plainYearMonthConfig: TransformConfig<Temporal.PlainYearMonth> = {
    parse: (input) => Temporal.PlainYearMonth.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.PlainYearMonth,
    invalidMessage: "Invalid plain year month",
    schemaFormat: "plain-year-month",
    example: "2020-01",
};

export const plainMonthDayConfig: TransformConfig<Temporal.PlainMonthDay> = {
    parse: (input) => Temporal.PlainMonthDay.from(input),
    encode: (input) => input.toString(),
    instanceType: Temporal.PlainMonthDay,
    invalidMessage: "Invalid plain month day",
    schemaFormat: "plain-month-day",
    example: "12-30",
};
