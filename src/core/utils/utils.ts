import path from "node:path";
import fs from "node:fs";

export function getValue(value: unknown): unknown {
    if (value !== undefined && value !== null) return value;

    console.error(`value: "${value}" is null or empty`);
    throw Error(`value: "${value}" is null or empty`).stack;
}

export function getBooleanValue(value: unknown): boolean {
    try {
        return stringToBoolean(getValue(value));
    }
    catch (ex) {
        throw new Error(`value: '${value}' can't be cast into Boolean\n${ex}`);
    }
}

export function getStringValue(value: unknown): string {
    try {
        return getValue(value) as string;
    } catch (ex) {
        throw new Error(`value: '${value}' can't be cast into String\n${ex}`);
    }
}

function stringToBoolean(value: unknown): boolean {
    return value?.toString().toLowerCase() === 'true';
}

export async function deleteFilesFromFolder(folderLocation: string): Promise<void> {
    console.log(`Deleting files from folder: ${folderLocation}`);
    const directoryPath = path.join(__dirname, folderLocation);
    if (fs.existsSync(directoryPath)) {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return console.error(`Unable to scan directory: ${err}`);
            }
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);
                console.info(`file to delete: ${filePath}`);
                return fs.rm(filePath, {recursive: true}, (error) => {
                    if (error) {
                        console.error(`Unable to delete directory: ${error}`);
                    }
                });
            });
        });
    }
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}