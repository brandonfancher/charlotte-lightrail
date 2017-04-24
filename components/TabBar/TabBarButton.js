const React = require('react-native')
const { TouchableOpacity } = React

const Button = (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
}

module.exports = Button
