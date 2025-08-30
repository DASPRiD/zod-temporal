import { z } from "zod/v4/mini";
import {
    type CoreParams,
    durationConfig,
    offsetDateTimeConfig,
    plainDateConfig,
    plainDateTimeConfig,
    plainMonthDayConfig,
    plainTimeConfig,
    plainYearMonthConfig,
    type TransformConfig,
    zonedDateTimeConfig,
} from "./core.js";

const createCodecConstructor =
    <T>({
        parse,
        encode,
        instanceType,
        invalidMessage,
        schemaFormat,
        example,
    }: TransformConfig<T>) =>
    (params?: CoreParams): z.ZodMiniCodec<z.ZodMiniType<string>, z.ZodMiniType<T>> => {
        const inputSchema = z.string();
        inputSchema._zod.toJSONSchema = () => ({
            type: "string",
            format: schemaFormat,
            example: example,
        });

        return z.codec(
            inputSchema,
            z.custom<T>((value) => value instanceof instanceType, {
                error: `Not an instance of ${instanceType.name}`,
            }),
            {
                decode: (value, context) => {
                    try {
                        return parse(value);
                    } catch {
                        context.issues.push({
                            code: "custom",
                            message: params?.error ?? invalidMessage,
                            input: context.value,
                        });

                        return undefined as never;
                    }
                },
                encode,
            },
        );
    };

export const duration = createCodecConstructor(durationConfig);
export const plainDate = createCodecConstructor(plainDateConfig);
export const plainDateTime = createCodecConstructor(plainDateTimeConfig);
export const plainTime = createCodecConstructor(plainTimeConfig);
export const offsetDateTime = createCodecConstructor(offsetDateTimeConfig);
export const zonedDateTime = createCodecConstructor(zonedDateTimeConfig);
export const plainYearMonth = createCodecConstructor(plainYearMonthConfig);
export const plainMonthDay = createCodecConstructor(plainMonthDayConfig);

export const zt = {
    duration,
    plainDate,
    plainDateTime,
    plainTime,
    offsetDateTime,
    zonedDateTime,
    plainYearMonth,
    plainMonthDay,
};

export default zt;
