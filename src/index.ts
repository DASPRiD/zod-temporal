import { string, type ZodType } from "zod/v4";
import {
    type CoreParams,
    durationConfig,
    offsetDateTimeConfig,
    plainDateConfig,
    plainDateTimeConfig,
    plainTimeConfig,
    type TransformConfig,
    zonedDateTimeConfig,
} from "./core.js";

const createParseConstructor =
    <T>({ parse, invalidMessage, schemaFormat, example }: TransformConfig<T>) =>
    (params?: CoreParams): ZodType<T, unknown> => {
        const inputSchema = string();
        inputSchema._zod.toJSONSchema = () => ({
            type: "string",
            format: schemaFormat,
            example: example,
        });

        return inputSchema.transform((value, context) => {
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
        });
    };

export const duration = createParseConstructor(durationConfig);
export const plainDate = createParseConstructor(plainDateConfig);
export const plainDateTime = createParseConstructor(plainDateTimeConfig);
export const plainTime = createParseConstructor(plainTimeConfig);
export const offsetDateTime = createParseConstructor(offsetDateTimeConfig);
export const zonedDateTime = createParseConstructor(zonedDateTimeConfig);

export const zt = {
    duration,
    plainDate,
    plainDateTime,
    plainTime,
    offsetDateTime,
    zonedDateTime,
};

export default zt;
