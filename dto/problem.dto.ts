

export interface CreateProblemDTO {
    name: string
    description: string

    testcases: {input: string, output: string, description ?: string}[]; // if description is present, we will create a sample case as well
}

export interface TestCaseDTO {
    input: string;
    output: string
}


export interface ExportProblemDTO {
    name: string
    description: string

    testcases: {input: string, output: string, description ?: string}[];
}