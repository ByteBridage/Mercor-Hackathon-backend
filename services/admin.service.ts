import { Problem, TestQuestion } from "@prisma/client";
import { CreateProblemDTO, TestCaseDTO } from "../dto/problem.dto";
import db from "../modules/db.module";
const logger = console;



// Steps to insert a new question into a competition
// 1. Create Question
// 2. Create Problem and attach it to competition



export async function createProblem(competitionId: string, questionId: string): Promise<Problem> {
    try {
        let problem = await db.problem.create({
            data: {
                questionId: questionId,
                competitionId: competitionId
            }
        });
        if(!problem) {
            logger.error("Problem creation failed");
            return null;
        }

        return problem;

    } catch(err: any) {
        logger.error("Failed to create Problem");
    }
}



// @TODO - Need to test this at priority. The code is too hacky, dont know if it'll work
export async function createQuestion(problemData: CreateProblemDTO): Promise<TestQuestion> {
    try {
        let testcases: TestCaseDTO[] = problemData.testcases;


        // Creating question object while also attaching testcases
        // @note - hacky part. 
        // Should work
        let question = await db.testQuestion.create({
            data: {
                name: problemData.name,
                description: problemData.description,
                testcases: {
                    // create: {
                    //     input: "",
                    //     output: "out",
                    //     SampleCase: {
                    //         create: {
                    //             description: ""
                    //         }
                    //     }
                    // }
                    createMany: {
                        data: testcases.map((t) => {

                            // This is the part which needs to be tested
                            if(t.description !== null && t.description !== undefined) {
                                return {
                                    input: t.input, 
                                    output: t.output,
                                    SampleCase: {
                                        create: {
                                            description: t.description
                                        }
                                    }
                                }
                            }

                            else {
                                return {
                                    input: t.input,
                                    output: t.output
                                }
                            }
                        })
                    }
                }
            }
        });

        if(!question) {
            logger.error("Question creation failed.");
            return null;
        }


        return question;

    } catch(err: any) {
        logger.error("Failed to create Problem statement")
        return null;
    }

}

