import { Problem, TestCase, TestCasePayload } from "@prisma/client";
import { CreateProblemDTO, TestCaseDTO } from "../dto/problem.dto";
import db from "../modules/db.module";
const logger = console;


// @TODO
export async function createProblem(problemData: CreateProblemDTO): Promise<Problem> {
    try {
        let testcases: TestCaseDTO[] = problemData.testcases.map((tc): TestCaseDTO => {
            return {
                input: tc.input,
                output: tc.output
            };
        });


        // Creating question object while also attaching testcases
        let question = await db.testQuestion.create({
            data: {
                name: problemData.name,
                description: problemData.description,
                testcases: {
                    createMany: {
                        data: testcases
                    }
                }
            }
        });

        if(!question) {
            logger.error("Question creation failed.");
            return null;
        }

        // let problem = await db.problem.create({
        //     data: {
        //         questionId: question.id,
        //         competitionId: 
        //     }
        // })


        // return question;

    } catch(err: any) {
        logger.error("Failed to create Problem statement")
        return null;
    }

}

