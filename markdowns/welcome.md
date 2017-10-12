Front-end / JavaScript optimization and build chains are evolving at a rapid rate.  In a few short years, we have gone from minifying JavaScript files then putting script tags on a page (with maybe some form of linting put in for good measure) to a process that can also involve:

1. Transpiling the code from a future syntax of JS
2. Having browser specific CSS written for you (post-CSS)
3. Inlining smaller static assets as data URIs in CSS
4. Reading application specific settings from files and the environment and making them available to the application as part of the build process.
5. And of course automated testing, linting, and minification.

Tree-shaking is another aspect of JavaScript optimization that has entered the mix in recent times.

NB: This is an interactive version of the [original article from justintimecoder.com](https://justintimecoder.com/treeshaking-in-javascript-with-rollup/).

## So what is it and why should I care?
In the brave new world of ES6 + JavaScript, we have a syntax that allows us to declare the dependencies of one file to other files in our project i.e the `import` keyword, as well as the ability to declare the functions, classes, and variables that other files may import i.e the `export` keyword.

Tree-shaking is the process of analyzing the code files that are required to run your application and then including only code that is actually used by your application.

During this process, a data structure that represents the intent of your code is created comprised of nodes that represent the code (functions, statements etc).  These nodes form a tree-like structure and once this has been created it is possible to work out what code is actually used by our application.

This results in the elimination of code in our files and dependencies that is effectively unreachable.  In a metaphorical sense, it's like shaking a tree and watching the loose leaves fall off, where the unreachable/unused code is represented by the loose leaves that fall from the tree.

<iframe src="https://giphy.com/embed/OWS35u8VQdccM" width="480" height="271" frameBorder="0" class="giphy-embed" style="margin: 0 auto;" allowFullScreen></iframe>

This means in terms of bundle size you only pay for what you use, which when you put it that way just seems like a no-brainer.
## How does it work?
Tree-shaking in JavaScript works by utilizing ES6 modules.  This is because ES6 modules are static in their structure.  Once defined they cannot change.  This differs from a format such as Common.js where, when the `require` function is used it returns an object that represents the exported members of the module.  A JavaScript object is dynamic in nature and therefore can be altered at runtime which is no use when wanting to be 100% sure of what is being used and where it is being used.

Every file that is parsed as part of the Tree-shaking process will have various kinds of export statement as a node of the top level of the data structure that is created as a result of parsing each file.(commonly referred to in computing science as an Abstract Syntax Tree)

In files that import these exported members, the usage of the import can then be tracked.  Again the key to this is that in ES6 import and exports are static and immutable.

## What do I need to do to use it?
There are a few module bundlers that offer tree-shaking such as Rollup and Webpack.  Any codebase that is written in ES6 module format can be easily converted to support this and there are plugins that offer the ability to do this on Common.js modules as part of the build process.

Below is an interactive code sample that can be run to see the results of performing tree-shaking on a small sample codebase.  What's really cool is the fact that as the parsing of files involves creating a data-structure so as to reason about the code, not only are unused imports excluded, but it can even exclude used imports if the imported and invoked functions contain no statements.

@[Start altering what is used and imported to see what is included and excluded]({ "stubs": ["src/main.js","src/myDeps.js"], "command": "node_modules/rollup/bin/rollup --config rollup.config.js" })


### Secondary considerations

#### 1. What are you building
One thing to bear in mind is what are you building.  For example, if you are building a library to be consumed by others then you may want to consider whether or not you wish to bundle and then perform tree-shaking on libraries that your code depends on.  It is not necessary to do this as a normal dependency will be downloaded via the package manager as it will be declared in your libraries' package.json and will, therefore, be downloaded anyway.  Bundling and then tree-shaking your code with a dependency brought in as part of your bundle may make the savings that you wish to achieve, but if you are not the only consumer of the dependency that you are bundling then you may experience no-gains or even the opposite effect in some cases.

#### 2. Where are you running
So obviously module bundling, (which currently goes hand in hand with tree-shaking) becomes massively enticing for applications that are browser-based and less beneficial if you are executing server-side.

#### 3. Common.js
It is not possible to do the kind of parsing required on a code base that is written in common.js.  There are plugins that allow libraries such as Rollup to handle these modules but it is something to be aware of, especially as many of the libraries your own code base depends on may be written in this format, even if your code is not.

## So what can it not do?
As mentioned now several times in this article ES6 modules are static in their structure.  Hence, any parsing of our code base can rely upon and understand the imports and exports of our modules.  However, JavaScript itself is dynamic so almost every construct in the language can be altered at runtime in impossible to predict manners.

In practical terms, this means that something such as a class, which will be imported as one reference/symbol cannot be statically analyzed so as to remove members (both static and instance) that are not used.

As seeing is believing, I have included another interactive code snippet below to demonstrate this.

@[Try altering the code to see how classes behave differently]({ "stubs": ["src/classDemo/main.js","src/classDemo/myClass.js"], "command": "node_modules/rollup/bin/rollup --config rollup.config2.js" })

Many libraries offer a fluent, chainable API that is achieved by having instance members return the underlying instance as a result of each function call which can result in extremely large classes/data-types.

There are workarounds for this, primarily implementing the main class declaration in one file and then having instance and static functions declared in separate files and then using the dynamic nature of JavaScript to add the members if the file is imported, though this is a manual process.

## Final Thoughts
Tree-shaking IMHO is one of the really cool things about modern JavaScript build systems.  It uses some fairly cool techniques to understand and then optimize your code.  Whilst it won't be a game-changer for every scenario, it's just one of the things that show how far JavaScript programming has come in the last few years.

For more tutorials on web development checkout my [other tutorials here](https://tech.io/users/2139342) or for my latest JavaScript content check me out on [justintimecoder.com](https://justintimecoder.com/tag/javascript/).
