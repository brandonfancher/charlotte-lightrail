import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { withTheme } from 'styled-components/native';
import { faqContent } from 'components/FaqContent';
import {
  AccordionContentView, AccordionHeaderView, AccordionWrapperView,
  AnimatedArrowsView, BoldText, ScrollViewView, ViewContainerView
} from './FAQCss';

class Faq extends React.Component {

  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    // Set initial animation values for each accordion section...
    const arrowAnimationValues = {};
    // const faqSections = faqContent(styles);
    faqContent.forEach((sec, index) => {
      arrowAnimationValues[`arrowBounce${index}`] = new Animated.Value(45);
    });
    arrowAnimationValues.arrowBounce0 = new Animated.Value(135);
    // and set initial state.
    this.state = {
      ...arrowAnimationValues,
      openIndex: 0
    };
  }

  toggleArrow = (openIndex) => {
    const prevOpenIndex = this.state.openIndex;
    // Change previously open toggle arrow back to point right (whether opening new toggle or closing)
    Animated.spring(this.state[`arrowBounce${prevOpenIndex}`], { toValue: 45 }).start();
    if (openIndex !== false) { // If user is not closing a toggle
      // Change newly open toggle arrow to point down
      Animated.spring(this.state[`arrowBounce${openIndex}`], { toValue: 135 }).start();
      this.setState({ openIndex }); // Set our openIndex
    }
  }

  renderContent = section => (
    <AccordionContentView>
      {section.contents}
    </AccordionContentView>
  );

  renderHeader = (section, index) => {
    const bounce = this.state[`arrowBounce${index}`];
    const animationConfig = {
      transform: [{
        rotate: bounce.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg']
        })
      }]
    };
    const { transform } = animationConfig;
    return (
      <AccordionHeaderView>
        <View style={{ flex: 1 }}>
          <BoldText allowFontScaling={false}>{section.title}</BoldText>
        </View>
        <AnimatedArrowsView style={{ transform }} />
      </AccordionHeaderView>
    );
  }

  render() {
    const { theme } = this.props;
    return (
      <ViewContainerView>
        <ScrollViewView>
          <AccordionWrapperView>
            <Accordion
              initiallyActiveSection={0}
              onChange={this.toggleArrow}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              sections={faqContent}
              underlayColor={theme.backgroundColorTrans}
            />
          </AccordionWrapperView>
        </ScrollViewView>
      </ViewContainerView>
    );
  }
}

export default withTheme(Faq);
