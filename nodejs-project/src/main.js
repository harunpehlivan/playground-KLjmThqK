import { functionOne, functionTwo, functionThree } from './myDeps';

import UnshakableClass from './myClass';

export default function myLibrary() {
    //start commenting out functions and see the results
    functionOne();
    functionTwo();
    functionThree();

    const myInstance = new UnshakableClass();
    //uncomment the line below to see the change it makes
    //myInstance.methodOne();
}