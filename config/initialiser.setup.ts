
// Code to automate initializing libraries.
// just a meta loader system, has nothing to do with the project code.

export class SetupSystem {
    static initialiser_list: Array<Function> = [];

    static AddInitialiser(method: Function) {
        this.initialiser_list.push(method)
    }

    static async initialise() {
        for(let method of this.initialiser_list)
            await method();
    }
}