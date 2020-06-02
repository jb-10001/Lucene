const { kebabCase } = require('lodash');
const { headers } = require('..');
module.exports = function(name) {
  // 首字母大写化
  name = name.slice(0, 1).toUpperCase() + name.slice(1);
  return [
    ...headers(),
    `import React, { ReactNode, ReactEventHandler, Component } from 'react';`,
    `// import { Link } from 'react-router-dom';`,
    `// import { Icon } from 'antd';`,
    ``,
    
    `export default class ${name} extends Component {`,
    ` constructor(props) {`,
    `    super(props);`,
    `    this.config = {`,
          
    `    };`,
    `    this.state = {`,
    `    };`,
    `  }`,
    ``,
    ` UNSAFE_componentWillMount() { }`,
    ``,
    `  componentDidMount() { }`,
    ``,
    `  componentDidShow() { }`,
    ``,
    `  render() {`,
    `    return (`,
    `      <div className="${kebabCase(name)}-main layout-content-style">`,
    ``,   
    `      </div>`,
    `    )`,
    `  }`,
    `}`,

    `//export default function ${name}({  }) {`,
    `//    return (`,
    `//     <div className="${kebabCase(name)}-main layout-content-style">`,
    `//`,   
    `//      </div>`,
    `//    )`,
    `//}`,
    ``,
    
  ].join('\n');
};
