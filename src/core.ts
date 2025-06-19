export type CoreParams = {
    error?: string;
};

export type TransformConfig<T> = {
    parse: (input: string) => T;
    invalidMessage: string;
    schemaFormat: string;
    example: string;
};

export const durationConfig: TransformConfig<Temporal.Duration> = {
    parse: (input) => Temporal.Duration.from(input),
    invalidMessage: "Invalid duration",
    schemaFormat: "duration",
    example: "PT1H",
};

export const plainDateConfig: TransformConfig<Temporal.PlainDate> = {
    parse: (input) => Temporal.PlainDate.from(input),
    invalidMessage: "Invalid plain date",
    schemaFormat: "date",
    example: "2020-01-01",
};

export const plainDateTimeConfig: TransformConfig<Temporal.PlainDateTime> = {
    parse: (input) => Temporal.PlainDateTime.from(input),
    invalidMessage: "Invalid plain date time",
    schemaFormat: "plain-date-time",
    example: "2020-01-01T14:00:00",
};

export const plainTimeConfig: TransformConfig<Temporal.PlainTime> = {
    parse: (input) => Temporal.PlainTime.from(input),
    invalidMessage: "Invalid plain time",
    schemaFormat: "time",
    example: "14:00:00",
};

export const offsetDateTimeConfig: TransformConfig<Temporal.ZonedDateTime> = {
    parse: (input) => Temporal.Instant.from(input).toZonedDateTimeISO("UTC"),
    invalidMessage: "Invalid offset date time",
    schemaFormat: "date-time",
    example: "2020-01-01T14:00:00Z",
};

export const zonedDateTimeConfig: TransformConfig<Temporal.ZonedDateTime> = {
    parse: (input) => Temporal.ZonedDateTime.from(input),
    invalidMessage: "Invalid zoned date time",
    schemaFormat: "zoned-date-time",
    example: "2020-01-01T14:00:00+01:00[Europe/Berlin]",
};
