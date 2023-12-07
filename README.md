# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Specs

* At the root level, allow for any number of branches
* A root node or "trunk" is distinct from other nodes in that it does not have a parent node
* A root node can be both a leaf or a branch node
* A branch can have any number of leaf and/or branch nodes
* A leaf node does not have any children
* Selected departments is a list of object ids (flat structure)
* The ratio between selected department to the number of total descendants (branches or leafs) of a specified node should be visible for each department

## Considerations 

* At the moment, we rebuild and rerender the whole tree whenever a node is selected/deselected. Ideally, we only re-render the changed node and all it's parents (trunk).
* A root node with no children is "treated" as a leaf node in terms of how it's view, i.e. we don't show how a badge to indicate how many nodes are selected. For such nodes, we could display (1/1) in front of the checkbox. In my opinion, it's better to just show nothing and rather have a badge at the top level that shows the combined number of selected nodes for all tree "trunks". 
* We may come up with a better solution with a state managmeent mechansm such as the built-in Context API.
* Regarding the tree structure, I could have stored references to the parents such that we could traverse through the tree and update nodes as needed, but I'm not sure if that would benefit much in this particular use case.
* Both string and numerical ids should be supported. 