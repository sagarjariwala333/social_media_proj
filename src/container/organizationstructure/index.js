import React from "react";
import { TreeView } from "../../components/tree"
const treeData = [
  {
    id: 1,
    name: "Parent 1",
    children: [
      {
        id: 2,
        name: "Child 1",
        children: [
          {
            id: 3,
            name: "Grandchild 1",
          },
          {
            id: 4,
            name: "Grandchild 2",
          },
        ],
      },
      {
        id: 5,
        name: "Child 2",
      },
    ],
  },
];

const App = () => {
  return (
    <div>
      <h1>Tree View Example</h1>
      <TreeView data={treeData} />
    </div>
  );
};

export default App;

