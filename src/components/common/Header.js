//import libraries for making a Component
import React from 'react';
import { Text, View } from 'react-native';

//Make a Component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
}

const styles = {
  textStyle: {
    fontSize: 20
  },
  viewStyle : {
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 80,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width : 0, height: 2},
    shadowOpacity: 0.9,
    position: 'relative'
  },

};

//make the component available to other parts of the app
export { Header };
