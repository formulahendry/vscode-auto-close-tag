//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import getCloseTag from '../src/getCloseTag';
// import pkg from '../package.json'; // TS doesn't support importing json
const pkg = require('../package.json');

const excludedTags = pkg.contributes.configuration.properties['auto-close-tag.excludedTags'].default;

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {

  // Defines a Mocha unit test
  test('getCloseTag', () => {
    TESTS.forEach(([text, autoClosed]) => {
      assert.equal(getCloseTag(text, excludedTags), autoClosed);
    });
  });
});

const TESTS = [
  [`lol <a href="/ok">x y</a><abc key=value> </`, 'abc>'],
  [`import React form 'react';
  
  export default () => <div>
      <Icon>foo</`, 'Icon>'],
  [`import React from 'react';
    import Icon from 'material-ui/Icon';
    import IconButton from 'material-ui/IconButton';
    import Dropdown from './Dropdown';
    
    
    class Comp extends React.PureComponent {
    
      render() {
        const {classes, items, inputProps, ...rest} = this.props;
        const {inputValue = '', selectedItems} = this.state;
        return (
          <ul
            className={classes.root}
            {...rest}
            ref={el => {
              this.rootEl = el;
            }}
          >
            <Dropdown
              component="li"
              style={{flex: 1}}
              input={
                <input
                  value={inputValue}
                  fullWidth
                  {...inputProps}
                  inputRef={el => {
                    this.inputEl = el;
                  }}
                  disableUnderline
                  onChange={e => this.update({inputValue: e.target.value})}
                />
              }
            >
            </Dropdown>
            {items.size || inputValue ? (
              <li>
                <IconButton
                  style={{height: '1.4em'}}
                  onClick={e => this.update({inputValue: '', selectedItems: Set()})}
                >
                  <Icon>clear</`, 'Icon>']
];
