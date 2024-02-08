import { ValueTransformer } from 'typeorm';

export class StringArrayTransformer implements ValueTransformer {
    to(value: string[] | null): string | null {
        if (!value) {
            return null;
        }

        return `{${value.join(',')}}`;
    }

    from(value: string | null): string[] | null {
        if (!value) {
            return null;
        }

        return value
            .replace(/[{}"]/g, '') // Remove curly braces and quotes
            .split(','); // Split the string into an array
    }
}
